import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  // UseGuard() decorator is used to protect the route, and it takes a strategy name as a parameter. Only authenticated users will be able to access this route.
  // The AuthGuard() function takes a strategy name as a parameter, in this case, jwt. This means that only authenticated users will be able to access this route.
  @Get('me')
  getMe(@Req() req: Request) {
    console.log('req', req.user);
    return 'this will return current user';
  }
}
