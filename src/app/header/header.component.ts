import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../shared/services/storage/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
onClearCart() {
throw new Error('Method not implemented.');
}
cart: any;
itemsQuantity: string|number;
getTotal(arg0: any): string|number {
throw new Error('Method not implemented.');
}
  constructor(private route: Router) { }

  isCustomerLoggedIn: boolean;
  isSellerLoggedIn: boolean ;
  user = UserStorageService.getUser();
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
