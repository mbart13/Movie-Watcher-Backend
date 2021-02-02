import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginData} from '../models/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.backend_base_url}/login`, user)
      .pipe(
        tap((data: LoginData) => this.doLoginUser(data.email, data.jwtToken)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  private doLoginUser(username: string, token: string): void {
    this.loggedUser = username;
    this.storeToken(token);
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

}
