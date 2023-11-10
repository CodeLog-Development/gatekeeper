import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FirebaseModule, ConfigModule],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule { }
