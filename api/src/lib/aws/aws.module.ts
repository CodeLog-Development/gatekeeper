import { Module } from '@nestjs/common';
import { Ec2Module } from './ec2/ec2.module';

@Module({
  imports: [Ec2Module],
})
export class AwsModule { }
