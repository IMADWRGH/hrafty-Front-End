import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: CustomerComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'dashboard', component: CustomerComponent, title: 'Customer - Dashboard' },
      { path: 'profile', component: ProfileComponent, title: 'Customer - Profile' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
