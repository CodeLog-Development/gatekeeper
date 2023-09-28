import { Controller, Get, Post } from '@nestjs/common';
import {
  ServerStatus,
  ServerService,
  ServerStartResponse,
  ServerStopResponse,
} from './server.service';

@Controller('server')
export class ServerController {
  constructor(private serverService: ServerService) { }

  @Get('status')
  async getStatus(): Promise<ServerStatus> {
    return await this.serverService.getServerStatus();
  }

  @Post('start')
  async startServer(): Promise<ServerStartResponse> {
    return await this.serverService.startServer();
  }

  @Post('stop')
  async stopServer(): Promise<ServerStopResponse> {
    return await this.serverService.stopServer();
  }
}
