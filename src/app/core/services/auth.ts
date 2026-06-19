import { Injectable, inject }
  from '@angular/core';

import { HttpClient }
  from '@angular/common/http';

import { Observable, tap }
  from 'rxjs';

import { environment }
  from '../../../environments/environment';

import { LoginRequest }
  from '../models/login-request.model';

import { LoginResponse }
  from '../models/login-response.model';

import { RegisterUserRequest }
  from '../models/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private api =
    `${environment.apiUrl}/auth`;

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.api}/login`,
        request
      )
      .pipe(

        tap(response => {

          localStorage.setItem(
            'token',
            response.token
          );

        })
      );
  }

  register(
    request: RegisterUserRequest
  ) {

    return this.http.post(
      `${environment.apiUrl}/users`,
      request
    );
  }

  logout() {

    localStorage.removeItem(
      'token'
    );
  }

  getToken() {

    return localStorage.getItem(
      'token'
    );
  }

  isLoggedIn() {

    return !!this.getToken();
  }
}