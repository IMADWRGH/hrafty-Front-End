import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserStorageService } from '../storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (UserStorageService.isSellerLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
