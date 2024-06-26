import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../shared/services/storage/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route: Router) { }

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isSellerLoggedIn: boolean = UserStorageService.isSellerLoggedIn();

  ngOnInit(): void {
    this.route.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isSellerLoggedIn = UserStorageService.isSellerLoggedIn();
    })
  }

  logOut() {
    UserStorageService.signOut();
    this.route.navigateByUrl('login');
  }

}
