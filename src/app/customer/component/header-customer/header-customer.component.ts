import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
export class HeaderCustomerComponent implements OnInit, OnDestroy {
  userId = UserStorageService.getUserId();
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  customer?: Customer;
  isCustomerLoggedIn = false;
  isSellerLoggedIn = false;
  isMenuOpen = false;
  user = UserStorageService.getUser();

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isSellerLoggedIn = UserStorageService.isSellerLoggedIn();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logOut(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  getCustomer(): void {
    this.customerService.getCustomerData(this.userId).subscribe({
      next: (data: Customer) => {
        this.customer = data;
      },
      error: (error) => {
        console.error('Failed to load customer data:', error);
      }
    });
  }

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.ClearCart();
  }

  getCustomerImage(): string {
    return this.customer?.imageURL && this.customer.imageURL.trim() !== ''
      ? this.customer.imageURL
      : '/assets/images/profile.png';
  }
}
