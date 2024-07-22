import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/Cart.model';
import { Customer } from 'src/app/models/Customer.model';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';
import { CustomerService } from '../../services/customer.service';
import { CartService } from 'src/app/shared/services/service/cart.service';

@Component({
  selector: 'app-header-customer',
  templateUrl: './header-customer.component.html',
  styleUrls: ['./header-customer.component.css']
})
export class HeaderCustomerComponent {
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

  // getCustomerImage():string  {
  //   return this.customer.image && this.customer.image.trim() !== '' ? this.customer.image : '/assets/images/profile.png';
  // }
}
