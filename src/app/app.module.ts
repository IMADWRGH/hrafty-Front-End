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
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';
import { AuthInterceptor } from './shared/services/interceptors/auth.interceptor';

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
    ServicesComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
