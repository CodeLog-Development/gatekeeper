import { Injectable, OnModuleInit } from '@nestjs/common';
import { Ec2Service } from '../aws/ec2/ec2.service';
import { ModuleRef } from '@nestjs/core';
import { StartServerResponse, StopServerResponse } from './server.interface';

export interface ServerStatus {
  success: boolean;
  message: string;
  running?: string[];
}

@Injectable()
export class ServerService implements OnModuleInit {
  private ec2Service?: Ec2Service;
  constructor(private moduleRef: ModuleRef) { }

  onModuleInit() {
    this.ec2Service = this.moduleRef.get(Ec2Service, { strict: false });
  }

  async getServerStatus(): Promise<ServerStatus> {
    if (!this.ec2Service) {
      return {
        success: false,
        message: "Couldn't communicate with amazon EC2",
      };
    }
    const status = await this.ec2Service.getInstanceStatus();
    const reservations = status.Reservations;
    const running: string[] = [];
    for (const i of reservations || []) {
      i.Instances?.forEach((instance) => {
        if (instance.State?.Name === 'running')
          running.push(instance.InstanceId || '');
      });
    }
    return {
      success: true,
      message: `Returned list of running instances`,
      running,
    };
  }

  async startInstance(id: string): Promise<StartServerResponse> {
    if (!this.ec2Service) {
      return {
        success: false,
        message: "Couldn't communicate with EC2 service",
      };
    }

    try {
      await this.ec2Service.startInstance(id);
      return { success: true, message: 'Instance started', started: [id] };
    } catch (e) {
      return { success: false, message: 'Failed to start instance' };
    }
  }

  async stopServer(id: string): Promise<StopServerResponse> {
    if (!this.ec2Service) {
      return {
        success: false,
        message: "Could't communicate with EC2 service",
      };
    }

    try {
      await this.ec2Service.stopInstance(id);
      return { success: true, message: 'Instance stopped', stopped: [id] };
    } catch (e) {
      return { success: false, message: 'Failed to stop instance' };
    }
  }
}
