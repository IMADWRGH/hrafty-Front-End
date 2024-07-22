import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ListServicesComponent } from './component/services-hrafty/list-services/list-services.component';
import { AddServiceComponent } from './component/services-hrafty/add-service/add-service.component';
import { MaterialDesignModule } from '../material-design.module';
import { AddProductComponent } from './component/product-hrafty/add-product/add-product.component';
import { ListProductComponent } from './component/product-hrafty/list-product/list-product.component';
import { HeaderSellerComponent } from './component/header-seller/header-seller.component';

@NgModule({
  declarations: [
    SellerComponent,
    ProfileComponent,
    ListServicesComponent,
    AddServiceComponent,
    AddProductComponent,
    ListProductComponent,
    HeaderSellerComponent,

  ],
  imports: [
    
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    MaterialDesignModule,
    ReactiveFormsModule

  ],
  exports: [
    HeaderSellerComponent,
  ]
})
export class SellerModule { }
