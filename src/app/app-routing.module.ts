import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/component/login/login.component';
import { ChooseRegistrationComponent } from './shared/component/choose-registration/choose-registration.component';
import { HomeComponent } from './home/home.component';
import { SellerRegistrationComponent } from './shared/component/seller-registration/seller-registration.component';
import { CustomerRegistrationComponent } from './shared/component/customer-registration/customer-registration.component';
import { SellerAuthGuard } from './shared/services/authGuard/seller-auth-guard.guard';
import { CustomerAuthGuard } from './shared/services/authGuard/customer-auth-guard.guard';
import { HraftyServiceComponent } from './hrafty-service/hrafty-service.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './hrafty-product/products.component';
import { CartComponent } from './cart/cart.component';
import { DetailsServicesComponent } from './home/details-services/details-services.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home - page' },
  { path: 'home', component: HomeComponent, title: 'Home - page' },
  { path: 'login', component: LoginComponent, title: 'Login - page' },
  { path: 'services', component: HraftyServiceComponent, title: 'Services - page' },
  { path: 'contact', component: ContactComponent, title: 'Contact - page' },
  { path: 'products', component: ProductsComponent, title: 'Products - page' },
  { path: 'cart', component: CartComponent, title: 'Cart - page' },
  { path: 'singup', component: ChooseRegistrationComponent, title: 'Singup - page' },
  { path: 'seller-register', component: SellerRegistrationComponent },
  { path: 'customer-register', component: CustomerRegistrationComponent },
  { path: 'test', component: DetailsServicesComponent },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then(m => m.SellerModule), canActivate: [SellerAuthGuard]
  },
  {
    path: 'customer', loadChildren: () =>
      import('./customer/customer.module').then(m => m.CustomerModule), canActivate: [CustomerAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
