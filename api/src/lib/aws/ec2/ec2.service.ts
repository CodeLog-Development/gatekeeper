import { Injectable } from '@nestjs/common';
import {
  DescribeInstancesCommand,
  DescribeInstancesCommandOutput,
  EC2Client,
  StartInstancesCommand,
  StartInstancesCommandOutput,
  StopInstancesCommand,
  StopInstancesCommandOutput,
} from '@aws-sdk/client-ec2';

@Injectable()
export class Ec2Service {
  private ec2Client: EC2Client;

  constructor() {
    this.ec2Client = new EC2Client({ region: 'af-south-1' });
  }

  async getInstanceStatus(): Promise<DescribeInstancesCommandOutput> {
    const command = new DescribeInstancesCommand({});
    const result = await this.ec2Client.send(command);
    return result;
  }

  async startInstance(id: string): Promise<StartInstancesCommandOutput> {
    const command = new StartInstancesCommand({
      InstanceIds: [id],
    });
    const result = await this.ec2Client.send(command);
    return result;
  }

  async stopInstance(id: string): Promise<StopInstancesCommandOutput> {
    const command = new StopInstancesCommand({ InstanceIds: [id] });
    const result = await this.ec2Client.send(command);
    return result;
  }
}
