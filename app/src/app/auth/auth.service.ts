import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@gatekeeper/api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private loggedIn: boolean;
  constructor(private http: HttpClient) {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(state: boolean) {
    this.loggedIn = state;
  }

  login(username: string, password: string): Observable<ApiResponse> {
    const observable = this.http.post<ApiResponse>(
      `${environment.apiUrl}/user/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return observable;
  }
}
