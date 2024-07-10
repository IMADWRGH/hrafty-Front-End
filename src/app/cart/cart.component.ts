import { Component } from '@angular/core';
import { Cart, CartItem } from '../models/Cart.model';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/services/service/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Cart = { items: [] };
  dataSource: CartItem[] = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'category',
    'quantity',
    'total',
    'action'
  ];

  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
  }
  onAddQuantity(items: CartItem): void {
    this.cartService.addTocart(items);
  }
  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }
  onClearCart() {
    this.cartService.ClearCart();
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  // onCheckout() {
  //   throw new Error('Method not implemented.');
  // }
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);

  }
}
