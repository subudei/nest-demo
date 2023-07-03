/* Description:

- Providers are the services that are injected into other classes. In this case, the AuthService is injected into the AuthController.

 - Service responsible for handling authentication logic. Service is used by the AuthController.

  -Service is a class annotated with an @Injectable() decorator. The @Injectable() decorator marks the class as a provider that can be injected into other classes as a dependency.
*/
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
      delete user.hash; // remove password from user object before returning it, it is a good practice to not return password to the client

      // step 3 : return user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  signin() {
    return { msg: "I'm signed in" };
  }
}
