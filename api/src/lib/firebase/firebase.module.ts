import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [FirebaseService],
})
export class FirebaseModule { }
