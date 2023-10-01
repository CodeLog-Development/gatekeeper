import { Module } from '@nestjs/common';
import { Ec2Service } from './ec2.service';

@Module({
  providers: [Ec2Service],
})
export class Ec2Module { }
