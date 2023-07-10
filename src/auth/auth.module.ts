import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

/* Description :
    JwtModule.register({}) =>  JwtModule.register() method is used to configure the JwtModule, which is responsible for generating and verifying JWT tokens.
*/
