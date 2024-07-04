import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';
import { SellerService } from '../../services/seller.service';
import { Seller } from 'src/app/models/Seller.model';
import { Address } from 'src/app/models/Address.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent {
  constructor(private sellerService: SellerService) { }
  userId = UserStorageService.getUserId()
  user=UserStorageService.getUser();
  seller?: Seller ;
  address?:Address;

  ngOnInit(): void {
    this.getSeller();
  }


  getSeller() {
    this.sellerService.getSellerData(this.userId).subscribe(
      (data: Seller) => {
        this.seller = data;
        this.sellerService.getAddressSeller(this.seller.id).subscribe(
          (data: Address) => {
            this.address = data;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}