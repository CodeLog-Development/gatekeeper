import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ServerStatus, ServerService } from './server.service';
import {
  StartInstanceRequest,
  StartServerResponse,
  StopServerRequest,
  StopServerResponse,
} from './server.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('server')
@UseGuards(AuthGuard)
export class ServerController {
  constructor(private serverService: ServerService) {}

  @Get('status')
  async getStatus(): Promise<ServerStatus> {
    return await this.serverService.getServerStatus();
  }

  @Post('start')
  async startServer(
    @Body() startRequest: StartInstanceRequest,
  ): Promise<StartServerResponse> {
    return await this.serverService.startInstance(startRequest.instanceId);
  }

  @Post('stop')
  async stopServer(
    @Body() stopRequest: StopServerRequest,
  ): Promise<StopServerResponse> {
    return await this.serverService.stopServer(stopRequest.instanceId);
  }
}
