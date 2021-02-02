import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

}
