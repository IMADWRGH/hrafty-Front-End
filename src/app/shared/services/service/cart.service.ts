import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart = new BehaviorSubject<Cart>({ items: [] });
  cart=this._cart.asObservable();
  constructor(private _sanckBar: MatSnackBar) { }

  addTocart(item: CartItem): void {
    console.log('CartService: Adding item to cart', item);
    const items = [...this._cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    console.log('CartService: New cart items', items);
    this._cart.next({ items });
    this._sanckBar.open('1 item added to cart', 'Ok', { duration: 3000 });
  }



  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;

    let filteredItems = this._cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this._cart.next({ items: filteredItems });
    this._sanckBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }




  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity).reduce((prev, current) => prev + current, 0);
  }



  ClearCart(): void {
    this._cart.next({ items: [] });
    this._sanckBar.open('cart is cleared', 'ok', { duration: 3000 });
  }



  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItem = this._cart.value.items.filter((_item) => _item.id !== item.id);
    if (update) {
      this._cart.next({ items: filteredItem });
      this._sanckBar.open('1 item removed from cart', 'ok', { duration: 3000 });
    }

    return filteredItem;
  }
}
