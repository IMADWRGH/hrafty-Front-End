import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SellerDashboardComponent } from './component/seller-dashboard/seller-dashboard.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ServicesComponent } from './component/services/services.component';
import { ProductsComponent } from './component/products/products.component';


@NgModule({
  declarations: [
    SellerComponent,
    SellerDashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ProfileComponent,
    ServicesComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
