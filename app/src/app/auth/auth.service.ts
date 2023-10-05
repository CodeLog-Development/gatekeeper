import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@gatekeeper/api';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private loggedIn: boolean;
  private currentUser?: string;
  constructor(private http: HttpClient) {
    this.loggedIn = true;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): string | undefined {
    return this.currentUser;
  }

  setLoggedIn(state: boolean) {
    this.loggedIn = state;
  }

  login(
    username: string,
    password: string,
  ): Observable<ApiResponse | undefined> {
    const observable = this.http
      .post<ApiResponse>(
        `${environment.apiUrl}/user/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          observe: 'response',
        },
      )
      .pipe(
        catchError((err: HttpErrorResponse, caught) => {
          console.log(' 🚀 ~ auth.service.ts:35 → Login failed: ', err);
          return caught;
        }),
        map((response: HttpResponse<ApiResponse>) => {
          if (!response.body) {
            return { success: false, message: 'Unkown error' };
          }

          if (response?.body?.success) {
            this.currentUser = username;
          }

          return response.body;
        }),
      );

    return observable;
  }

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}/user`,
      { username, email, password },
      { withCredentials: true },
    );
  }
}
