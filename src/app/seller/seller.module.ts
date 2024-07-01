import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProductsComponent } from './component/products/products.component';
import { ListServicesComponent } from './component/services-hrafty/list-services/list-services.component';
import { AddServiceComponent } from './component/services-hrafty/add-service/add-service.component';
import { MaterialDesignModule } from '../material-design.module';

@NgModule({
  declarations: [
    SellerComponent,
    ProfileComponent,
    ProductsComponent,
    ListServicesComponent,
    AddServiceComponent,

  ],
  imports: [
    
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    MaterialDesignModule,
    ReactiveFormsModule

  ]
})
export class SellerModule { }
