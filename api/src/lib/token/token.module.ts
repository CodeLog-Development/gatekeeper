import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthenticationMiddleware } from '../auth/auth.middleware';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      path: 'tokens/buy',
      method: RequestMethod.POST,
    });
  }
}
