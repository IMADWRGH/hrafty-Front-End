import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerDashboardComponent } from './component/seller-dashboard/seller-dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ServicesComponent } from './component/services/services.component';
import { ProductsComponent } from './component/products/products.component';

const routes: Routes = [
  { path: '', component: SellerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: SellerDashboardComponent, title: 'Seller - Dashboard' },
  { path: 'profile', component: ProfileComponent, title: 'Seller - Profile' },
  { path: 'products', component: ProductsComponent, title: 'Seller - Products' },
  { path: 'services', component: ServicesComponent, title: 'Seller - Services' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
