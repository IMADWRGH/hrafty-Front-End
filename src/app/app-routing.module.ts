import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/component/login/login.component';
import { SingupComponent } from './shared/component/singup/singup.component';

const routes: Routes = [
  // { path: '**', redirectTo: '/home' },
  // { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home - page' },
  { path: 'login', component: LoginComponent, title: 'Login - page' },
  { path: 'singup', component: SingupComponent, title: 'Singup - page' },
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
