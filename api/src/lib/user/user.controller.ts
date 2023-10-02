import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthRequest, NewUser } from './user.interface';
import { UserService } from './user.service';
import { Response } from 'express';
import { ApiResponse } from '../api.interface';

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body() newUser: NewUser,
    @Res({ passthrough: true }) res: Response
  ): Promise<ApiResponse> {
    try {
      if (!EMAIL_REGEX.test(newUser.email)) {
        return { success: false, message: 'Invalid email' };
      }

      const existingEmail = await this.userService.findUserByEmail(
        newUser.email
      );
      const existingUsername = await this.userService.findUserByUsername(
        newUser.username
      );

      console.log(
        '🚀 ~ user.controller.ts:31 → Existing users (undefined is good): ',
        existingEmail,
        existingUsername
      );

      if (existingEmail !== undefined || existingUsername !== undefined) {
        return {
          success: false,
          message: 'A user already exists with this username or email',
        };
      }

      const result = await this.userService.createUser(newUser);
      if (result !== undefined) {
        res.cookie('auth', result.secret, {
          path: '/',
          secure: true,
          expires: new Date(result.expires),
          httpOnly: true,
          sameSite: 'none',
        });
        return { success: true, message: 'User registered' };
      } else {
        res.status(401);
        return { success: false, message: "Couldn't create user!" };
      }
    } catch (e) {
      console.error(" ~ user.controller.ts:14 → Couldn't create new user!", e);
      res.status(401);
      return { success: false, message: "Couldn't create user!" };
    }
  }

  @Post('/login')
  async login(
    @Body() loginRequest: AuthRequest,
    @Res({ passthrough: true }) res: Response
  ): Promise<ApiResponse> {
    const user = await this.userService.findUserByUsername(
      loginRequest.username
    );

    if (!user) {
      return { success: false, message: 'No such user exists' };
    }

    if (!user.verified) {
      return { success: false, message: 'User is not verified' };
    }

    const result = await this.userService.authenticate(
      loginRequest.username,
      loginRequest.password
    );

    if (result === undefined) {
      return { success: false, message: 'Incorrect username or password' };
    }

    res.cookie('auth', result.secret, {
      path: '/',
      secure: true,
      expires: new Date(result.expires),
      httpOnly: true,
      sameSite: 'none',
    });

    return {
      success: true,
      message: 'Logged in',
    };
  }
}
