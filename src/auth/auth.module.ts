import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

/* Description :
    JwtModule.register({}) =>  JwtModule.register() method is used to configure the JwtModule, which is responsible for generating and verifying JWT tokens.
    controllers: [AuthController] =>  The AuthController is responsible for handling the authentication requests.
    providers: [AuthService, JwtStrategy] =>  The AuthService is responsible for validating the user credentials and generating the JWT token. The JwtStrategy is responsible for validating the JWT token.
*/
