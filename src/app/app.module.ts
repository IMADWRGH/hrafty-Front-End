import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChooseRegistrationComponent } from './shared/component/choose-registration/choose-registration.component';
import { SellerRegistrationComponent } from './shared/component/seller-registration/seller-registration.component';
import { CustomerRegistrationComponent } from './shared/component/customer-registration/customer-registration.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './shared/services/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design.module';
import { HraftyServiceComponent } from './hrafty-service/hrafty-service.component';
import { ProductsComponent } from './hrafty-product/products.component';
import { ProductsHeaderComponent } from './hrafty-product/components/products-header/products-header.component';
import { FilterComponent } from './hrafty-product/components/filter/filter.component';
import { ProductBoxComponent } from './hrafty-product/components/product-box/product-box.component';
import { CartComponent } from './cart/cart.component';
import { DetailsServicesComponent } from './home/details-services/details-services.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ChooseRegistrationComponent,
    SellerRegistrationComponent,
    CustomerRegistrationComponent,
    HomeComponent,
    ProductsComponent,
    HraftyServiceComponent,
    ProductsHeaderComponent,
    FilterComponent,
    ProductBoxComponent,
    CartComponent,
    DetailsServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialDesignModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
