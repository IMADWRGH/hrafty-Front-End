import { Component } from '@angular/core';
import { Service } from 'src/app/models/Service.model';
import { SellerService } from 'src/app/seller/services/seller.service';
import { SearchService } from 'src/app/shared/services/service/search.service';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';

@Component({
  selector: 'app-details-services',
  templateUrl: './details-services.component.html',
  styleUrls: ['./details-services.component.css']
})
export class DetailsServicesComponent {
  constructor(private serch: SearchService, private sellerService: SellerService){}
  cards:Service[]=[];
  card =[];
  userId = UserStorageService.getUserId()

  ngOnInit(){
    this.serch.searchResults$.subscribe(
      {
        next: (data) => {
          this.cards = data;
          console.log(data);
          
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }


}
