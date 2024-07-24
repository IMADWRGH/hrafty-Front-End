import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/Cart.model';
import { Seller } from 'src/app/models/Seller.model';
import { CartService } from 'src/app/shared/services/service/cart.service';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-header-seller',
  templateUrl: './header-seller.component.html',
  styleUrls: ['./header-seller.component.css']
})
export class HeaderSellerComponent {
  userId = UserStorageService.getUserId()
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  seller?: Seller;

  constructor(private route: Router, private cartService: CartService, private sellerService:SellerService ) { }

  isCustomerLoggedIn: boolean;
  isSellerLoggedIn: boolean;
  user = UserStorageService.getUser();
  ngOnInit(): void {
    this.getSeller();
    this.route.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isSellerLoggedIn = UserStorageService.isSellerLoggedIn();
    })
  }

  logOut() {
    UserStorageService.signOut();
    this.route.navigateByUrl('login');
  }

  getSeller() {
    this.sellerService.getSellerData(this.userId).subscribe(
      (data: Seller) => {
        this.seller = data;        
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // getSellerImage():string  {
  //   return this.seller.image && this.seller.image.trim() !== '' ? this.seller.image : '/assets/images/profile.png';
  // }

}
