/* Description:

- Providers are the services that are injected into other classes. In this case, the AuthService is injected into the AuthController.

 - Service responsible for handling authentication logic. Service is used by the AuthController.

  -Service is a class annotated with an @Injectable() decorator. The @Injectable() decorator marks the class as a provider that can be injected into other classes as a dependency.
*/
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    // step 1 : generate password using argon2
    const hash = await argon.hash(dto.password);

    // step 2 :  save user to database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          // hash: hash,
          hash,
        },
      });
      // step 3 : return token
      return this.signToken(user.id, user.email);
    } catch (error) {
      // https://github.com/prisma/prisma/issues/17945  =>  PrismaClientKnownRequestError
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user not found throw error
    if (!user) {
      throw new ForbiddenException('Wrong email');
    }
    // compare password
    const isPasswordValid = await argon.verify(user.hash, dto.password);
    //  argon.verify takes two arguments, the first one is the hash password and the second one is the plain password
    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong password');
    }

    return this.signToken(user.id, user.email); // return token
  }
  /*   Sign JWT token is a method that takes two arguments,
   the first one is the user id and the second one is the user 
   email. Payload is the data that will be stored in the JWT token.
    The sub property is the user id and the email property is 
    the user email. The signAsync method is used to sign the 
    JWT token. The signAsync method takes two arguments,
     the first one is the payload and the second one is the
      options object. The expiresIn property is used to set 
      the expiration time of the JWT token. The secret property 
      is used to set the secret key that will be used to sign the 
      JWT token.
   */
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
