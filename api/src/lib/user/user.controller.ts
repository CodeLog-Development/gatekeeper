import { Controller, Post, Body, Res } from '@nestjs/common';
import { NewUser } from './user.interface';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async createUser(
    @Body() newUser: NewUser,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const result = await this.userService.createUser(newUser);
      if (result !== undefined) {
        res.cookie('auth', result.secret, {
          path: '/',
          secure: true,
          expires: new Date(result.expires),
          httpOnly: true,
          sameSite: 'strict',
        });
      } else {
        res.status(401);
      }
    } catch (e) {
      console.error(" ~ user.controller.ts:14 → Couldn't create new user!", e);
      res.status(401);
    }
  }
}
