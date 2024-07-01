import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProductsComponent } from './component/products/products.component';
import { ListServicesComponent } from './component/services-hrafty/list-services/list-services.component';
import { AddServiceComponent } from './component/services-hrafty/add-service/add-service.component';

const routes: Routes = [
  {
    path: '', component: SellerComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SellerComponent, title: 'Seller - Dashboard' },
      { path: 'profile', component: ProfileComponent, title: 'Seller - Profile' },
      { path: 'products', component: ProductsComponent, title: 'Seller - Products' },
      { path: 'list-services', component: ListServicesComponent, title: 'Seller - Services list' },
      { path: 'services', component: AddServiceComponent, title: 'Seller - New service' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
