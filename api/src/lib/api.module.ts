import { Module } from '@nestjs/common';
import { ServerModule } from './server/server.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AwsModule } from './aws/aws.module';

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
  ],
})
export class ApiModule { }
