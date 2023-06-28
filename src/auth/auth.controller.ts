/*
Controller is a class annotated with a @Controller() decorator. Decorators associate classes with required metadata and enable Nest to create a routing map (tie requests to the corresponding controllers).
Controllers are responsible for handling incoming requests and returning responses to the client.
Service is a class annotated with an @Injectable() decorator. The @Injectable() decorator marks the class as a provider that can be injected into other classes as a dependency.
Service is responsible for data storage/retrieval and business logic. Service is used by the Controller.
*/
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  // 👇 Inject the AuthService, private is used to avoid  this.authService = authService; in the constructor
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({ dto });
    return this.authService.signup();
  }
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
