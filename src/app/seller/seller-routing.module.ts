import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerDashboardComponent } from './component/seller-dashboard/seller-dashboard.component';

const routes: Routes = [
  { path: '', component: SellerComponent },
  {path:'app-seller-dashboard',component:SellerDashboardComponent,title:'Sller - Dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
