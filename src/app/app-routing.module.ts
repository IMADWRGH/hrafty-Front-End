import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/component/login/login.component';
import { ChooseRegistrationComponent } from './shared/component/choose-registration/choose-registration.component';
import { HomeComponent } from './home/home.component';
import { SellerRegistrationComponent } from './shared/component/seller-registration/seller-registration.component';
import { CustomerRegistrationComponent } from './shared/component/customer-registration/customer-registration.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home - page' },
  { path: 'home', component: HomeComponent, title: 'Home - page' },
  { path: 'login', component: LoginComponent, title: 'Login - page' },
  { path: 'services', component: ServicesComponent, title: 'Services - page' },
  { path: 'products', component: ProductsComponent, title: 'Products - page' },
  { path: 'singup', component: ChooseRegistrationComponent, title: 'Singup - page' },
  { path: 'seller-register', component: SellerRegistrationComponent },
  { path: 'customer-register', component: CustomerRegistrationComponent },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then(m => m.SellerModule)
  },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
