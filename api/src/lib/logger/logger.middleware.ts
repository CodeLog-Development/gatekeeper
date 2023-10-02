import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    console.log(`📘 ~ Incoming request: ${req.method} ${req.url}`);
    next();
  }
}
