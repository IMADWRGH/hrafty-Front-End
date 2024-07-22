import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerDashboardComponent } from './component/customer-dashboard/customer-dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MaterialDesignModule } from '../material-design.module';
import { HeaderCustomerComponent } from './component/header-customer/header-customer.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerDashboardComponent,
    ProfileComponent,
    HeaderCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialDesignModule
  ],
  exports: [ 
    HeaderCustomerComponent
  ]
})
export class CustomerModule { }
