import { Injectable } from '@angular/core';
import {of, Observable, BehaviorSubject} from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ResponseData} from '../models/response-data';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  loggedUser = new BehaviorSubject<User>(null);
  isLoading = false;

  register(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.backend_base_url}/register`, user)
      .pipe(
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    this.isLoading = true;
    return this.http.post<any>(`${environment.backend_base_url}/login`, user)
      .pipe(
        tap((data: ResponseData) => {
          this.doLoginUser(data.userId, data.email, data.jwtToken);
          this.isLoading = false;
        }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          this.isLoading = false;
          return of(false);
        }));
  }

  logout(): Observable<boolean> {
    return this.http.post<any>(`${environment.backend_base_url}/sign-out`, {})
      .pipe(
        tap(() => {
          this.doLogoutUser();
        }),
        mapTo(true),
        catchError(error => {
          this.doLogoutUser();
          alert(error.error);
          return of(false);
      }));
  }

  private doLoginUser(id: number, email: string, token: string): void {
    const user = new User(id, email);
    this.loggedUser.next(user);
    this.storeToken(token);
  }

  private doLogoutUser(): void {
    this.loggedUser.next(null);
    this.removeToken();
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

}
