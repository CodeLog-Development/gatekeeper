import { Module } from '@nestjs/common';
import { ServerModule } from './server/server.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ServerModule,
    FirebaseModule,
    UserModule,
  ],
})
export class ApiModule { }
