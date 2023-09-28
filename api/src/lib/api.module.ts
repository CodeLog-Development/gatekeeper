import { Module } from '@nestjs/common';
import { ServerModule } from './server/server.module';

@Module({
  providers: [],
  imports: [ServerModule],
  exports: [],
})
export class ApiModule { }
