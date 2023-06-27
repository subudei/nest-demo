/* Description:

- Providers are the services that are injected into other classes. In this case, the AuthService is injected into the AuthController.

 - Service responsible for handling authentication logic. Service is used by the AuthController.

  -Service is a class annotated with an @Injectable() decorator. The @Injectable() decorator marks the class as a provider that can be injected into other classes as a dependency.
*/
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup() {
    return { msg: "I'm signed up" };
  }

  signin() {
    return { msg: "I'm signed in" };
  }
}
