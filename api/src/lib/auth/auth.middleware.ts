import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NextFunction, Response } from 'express';
import { UserService } from '../user/user.service';
import { User } from '../user';
import { Request } from '../api.interface';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private userService: UserService;
  constructor(private moduleRef: ModuleRef) {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const authCookie: string = req.cookies['auth'];
    if (!authCookie) {
      next();
    } else {
      this.userService
        .checkCookie(authCookie)
        .then((user: User | undefined) => {
          if (user?.verified) {
            req.user = user;
          }
        })
        .catch((e) => {
          console.error(
            ' ~ auth.middleware.ts:25 → Failed to check cookie',
            e,
          );
          res.status(500).end();
        })
        .finally(() => next());
    }
  }
}
