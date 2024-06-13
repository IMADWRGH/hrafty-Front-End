import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/models/AuthResponse.model';
import { Customer } from 'src/app/models/Customer.model';
import { Seller } from 'src/app/models/Seller.model';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = "http://localhost:8080/api/v1/auth/"

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { email, password })
  }


  registerCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.API_URL}/register-customer`, customer);
  }

  registerSeller(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(`${this.API_URL}/register-seller`, seller);
  }
  singup(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}`, user);
  }
}
