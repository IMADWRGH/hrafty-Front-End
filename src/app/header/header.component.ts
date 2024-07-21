import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../shared/services/storage/user-storage.service';
import { CustomerService } from '../customer/services/customer.service';
import { Customer } from '../models/Customer.model';
import { Cart, CartItem } from '../models/Cart.model';
import { CartService } from '../shared/services/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userId = UserStorageService.getUserId()
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  customer?: Customer;

  constructor(private route: Router, private customerService: CustomerService, private cartService: CartService) { }

  isCustomerLoggedIn: boolean;
  isSellerLoggedIn: boolean;
  user = UserStorageService.getUser();
  ngOnInit(): void {
    this.getCustomer();
    this.route.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isSellerLoggedIn = UserStorageService.isSellerLoggedIn();
    })
  }

  logOut() {
    UserStorageService.signOut();
    this.route.navigateByUrl('login');
  }

  getCustomer() {
    this.customerService.getCustomerData(this.userId).subscribe(
      (data: Customer) => {
        this.customer = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }



  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.ClearCart();
  }
}
