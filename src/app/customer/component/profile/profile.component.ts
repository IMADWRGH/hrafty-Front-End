import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from 'src/app/models/Customer.model';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  customer: Customer;
  userId = UserStorageService.getUserId()
  constructor(private customerService:CustomerService){}
  ngOnInit() {
    
  }
  getCustomer() {
    this.customerService.getCustomerData(this.userId).subscribe(
      (data: Customer) => {
        this.customer = data;
        console.log(data);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
