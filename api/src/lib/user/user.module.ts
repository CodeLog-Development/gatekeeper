import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthenticationMiddleware } from '../auth/auth.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {
        path: 'user/password',
        method: RequestMethod.PATCH,
      },
      {
        path: 'user/info',
        method: RequestMethod.GET,
      },
      {
        path: 'user/notificationToken',
        method: RequestMethod.PATCH,
      },
    );
  }
}
