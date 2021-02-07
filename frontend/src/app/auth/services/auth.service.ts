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

  private readonly USER_DATA = 'userData';
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
          this.doLoginUser(data.userId, data.email, data.jwtToken, +data.expiresIn);
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

  private doLoginUser(id: number, email: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(id, email, token, expirationDate);
    this.loggedUser.next(user);
    this.saveUserData(user);
  }

  private doLogoutUser(): void {
    this.loggedUser.next(null);
    this.removeUserData();
  }

  getJwtToken(): string {
    const user: User = JSON.parse(localStorage.getItem(this.USER_DATA));
    if (user) {
      return user.jwtToken;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  autoLogin(): void {
    const user: User = JSON.parse(localStorage.getItem(this.USER_DATA));
    if (!user) {
      return;
    }

    const retrievedUser = new User(user.id, user.email, user.jwtToken, user.tokenExpirationDate);

    if (retrievedUser.token) {
      this.loggedUser.next(retrievedUser);
    }
  }

  private saveUserData(user: User): void {
    localStorage.setItem(this.USER_DATA, JSON.stringify(user));
  }

  private removeUserData(): void {
    localStorage.removeItem(this.USER_DATA);
  }

}
