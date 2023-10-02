import { Injectable, NestMiddleware } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private userService: UserService;
  constructor(private moduleRef: ModuleRef) {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const authCookie: string = req.cookies['auth'];
    if (!authCookie) {
      res.status(401).end();
    } else {
      this.userService
        .checkCookie(authCookie)
        .then((isValid) => {
          if (isValid) {
            next();
          } else {
            res.status(401).end();
          }
        })
        .catch((e) => {
          console.error(
            ' ~ auth.middleware.ts:25 → Failed to check cookie',
            e
          );
          res.status(500).end();
        });
    }
  }
}
