import { Injectable } from '@angular/core';
import { Auth } from 'src/app/models/Auth.model';
import { User } from 'src/app/models/User.model';

const USER = 'User';
const Token = 'Token';
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  saveToken(token: string): void {
    window.localStorage.removeItem(Token);
    window.localStorage.setItem(Token, token);
  }

  static getToken(): string {
    return localStorage.getItem(Token);
  }

  saveUser(user: User): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): Auth {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): number {
    const data = this.getUser();
    if (data === null) {
      return 0;
    }
    return data.user.id;
  }

  static getUserRole(): string {
    const data = this.getUser();
    if (data === null) {
      return '';
    }
    return data.user.role;
  }

  static isSellerLoggedIn(): boolean {
    if (!this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'SELLER';
  }

  static isCustomerLoggedIn(): boolean {
    if (!this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(Token);
    window.localStorage.removeItem(USER);
  }
}


