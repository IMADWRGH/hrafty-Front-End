import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'src/app/models/Auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }
  user!:Auth;
  private userData=new BehaviorSubject<Auth>(this.user);
  userData$ = this.userData.asObservable();

  setUserData(data: any) {
    this.userData.next(data);
  }
}
