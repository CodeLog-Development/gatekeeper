import { Injectable, OnModuleInit } from '@nestjs/common';
import { Ec2Service } from '../aws/ec2/ec2.service';
import { ModuleRef } from '@nestjs/core';
import {
  InstanceInfo,
  InstanceListResponse,
  StartServerResponse,
  StopServerResponse,
} from './server.interface';
import { FirebaseService } from '../firebase/firebase.service';

export interface ServerStatus {
  success: boolean;
  message: string;
  running?: string[];
}

@Injectable()
export class ServerService implements OnModuleInit {
  private ec2Service?: Ec2Service;
  private firebaseService?: FirebaseService;
  constructor(private moduleRef: ModuleRef) { }

  onModuleInit() {
    this.ec2Service = this.moduleRef.get(Ec2Service, { strict: false });
    this.firebaseService = this.moduleRef.get(FirebaseService, {
      strict: false,
    });
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
    if (!this.ec2Service || !this.firebaseService) {
      return {
        success: false,
        message: "Couldn't communicate with required services",
      };
    }

    try {
      await this.ec2Service.startInstance(id);
      await this.firebaseService.sendNotification({
        title: 'Server started',
        message: '✅ The Ultimate Reloaded server has been started',
      });
      return { success: true, message: 'Instance started', started: [id] };
    } catch (e) {
      console.warn(
        ' 🚀 ~ server.service.ts → Caught an error trying to start the server',
        e,
      );
      return { success: false, message: 'Failed to start instance' };
    }
  }

  async stopServer(id: string): Promise<StopServerResponse> {
    if (!this.ec2Service || !this.firebaseService) {
      return {
        success: false,
        message: "Could't communicate with required services",
      };
    }

    try {
      await this.ec2Service.stopInstance(id);
      await this.firebaseService.sendNotification({
        title: 'Server stopped',
        message: '⛔ The Ultimate Reloaded server has been stopped',
      });
      return { success: true, message: 'Instance stopped', stopped: [id] };
    } catch (e) {
      console.warn(
        ' 🚀 ~ server.service.ts → Caught an error trying to stop the server',
        e,
      );
      return { success: false, message: 'Failed to stop instance' };
    }
  }

  async getInstances(): Promise<InstanceInfo[]> {
    const firestore = this.firebaseService?.getFirestore();
    const docs = await firestore?.collection('/instances').get();
    const instances: InstanceInfo[] = [];
    for (const d of docs?.docs || []) {
      const info = d.data() as InstanceInfo;
      instances.push(info);
    }

    return instances;
  }
}
