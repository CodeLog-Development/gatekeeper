import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StartServerResponse, StopServerResponse } from '@gatekeeper/api';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export interface ServerStatus {
  success: boolean;
  message: string;
  running?: string[];
}

@Injectable()
export class ServerStatusService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  getStatus(): Observable<HttpResponse<ServerStatus>> {
    return this.http.get<ServerStatus>(`${environment.apiUrl}/server/status`, {
      withCredentials: true,
      observe: 'response',
    });
  }

  startServer(id: string): Observable<StartServerResponse | undefined> {
    return this.http
      .post<StartServerResponse>(
        `${environment.apiUrl}/server/start`,
        {
          instanceId: id,
        },
        {
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        retry(3),
        catchError(this.handleError),
        map((res: HttpResponse<StartServerResponse>) => res.body || undefined)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.authService.setLoggedIn(false);
      this.router.navigateByUrl('/login');
    }

    return of(undefined);
  }

  stopServer(id: string): Observable<StopServerResponse | undefined> {
    return this.http
      .post<StopServerResponse>(
        `${environment.apiUrl}/server/stop`,
        {
          instanceId: id,
        },
        {
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        retry(3),
        catchError(this.handleError),
        map((res) => res.body || undefined)
      );
  }
}
