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
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {
        path: 'password',
        method: RequestMethod.PATCH,
      },
      {
        path: '',
        method: RequestMethod.GET,
      },
    );
  }
}
