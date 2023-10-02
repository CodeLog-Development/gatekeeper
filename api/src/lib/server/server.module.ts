import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { AuthenticationMiddleware } from '../auth/auth.middleware';

@Module({
  providers: [ServerService],
  controllers: [ServerController],
})
export class ServerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ServerController);
  }
}
