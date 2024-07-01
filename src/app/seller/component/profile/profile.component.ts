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
  constructor(private data: SellerService) { }
  user = UserStorageService.getUser()
  seller: Seller ;
  address:Address;

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.data.getAddressSeller(this.user.id).subscribe((data: Seller) => {
      this.address=data;
      console.log(data);
    })
    this.data.getSellerData(this.user.id).subscribe((data) => {
      this.seller = data;
      console.log(this.seller.nb_license);
     
      

    })
  }




}
