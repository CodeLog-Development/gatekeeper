import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../api.interface';

export class ServerStatus implements ApiResponse {
  success: boolean;
  message: string;
  constructor(public running: boolean) {
    this.success = true;
    this.message = 'Server is ' + running ? 'running' : 'not running';
  }
}

export class ServerStartResponse implements ApiResponse {
  constructor(public success: boolean, public message: string) { }
}

export class ServerStopResponse implements ApiResponse {
  constructor(public success: boolean, public message: string) { }
}

@Injectable()
export class ServerService {
  async getServerStatus(): Promise<ServerStatus> {
    // TODO: Get Server status
    return new ServerStatus(false);
  }

  async startServer(): Promise<ServerStartResponse> {
    // TODO: Start Server
    return new ServerStartResponse(true, 'Server successfully started');
  }

  async stopServer(): Promise<ServerStopResponse> {
    // TODO: Stop server
    return new ServerStopResponse(true, 'Server successfully stopped');
  }
}
