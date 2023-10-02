import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StartServerResponse, StopServerResponse } from '@gatekeeper/api';
import { environment } from '../../environments/environment';

export interface ServerStatus {
  success: boolean;
  message: string;
  running?: string[];
}

@Injectable()
export class ServerStatusService {
  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<ServerStatus>(`${environment.apiUrl}/server/status`, {
      withCredentials: true,
    });
  }

  startServer(id: string) {
    return this.http.post<StartServerResponse>(
      `${environment.apiUrl}/server/start`,
      {
        instanceId: id,
      },
      {
        withCredentials: true,
      }
    );
  }

  stopServer(id: string) {
    return this.http.post<StopServerResponse>(
      `${environment.apiUrl}/server/stop`,
      {
        instanceId: id,
      },
      {
        withCredentials: true,
      }
    );
  }
}
