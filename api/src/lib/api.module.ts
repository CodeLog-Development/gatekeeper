import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ServerModule } from './server/server.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AwsModule } from './aws/aws.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { CurrencyModule } from './currency/currency.module';
import { TokenModule } from './token/token.module';
import { AuthenticationMiddleware } from './auth/auth.middleware';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.production'],
    }),
    ServerModule,
    FirebaseModule,
    AwsModule,
    UserModule,
    CurrencyModule,
    TokenModule,
    StoreModule,
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthenticationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
