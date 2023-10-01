import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  StartServerResponse,
  StopServerResponse,
} from '../../../../api/src/lib/server/server.interface';

export interface ServerStatus {
  success: boolean;
  message: string;
  running?: string[];
}

@Injectable()
export class ServerStatusService {
  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<ServerStatus>('/api/server/status');
  }

  startServer(id: string) {
    return this.http.post<StartServerResponse>('/api/server/start', {
      instanceId: id,
    });
  }

  stopServer(id: string) {
    return this.http.post<StopServerResponse>('/api/server/stop', {
      instanceId: id,
    });
  }
}
