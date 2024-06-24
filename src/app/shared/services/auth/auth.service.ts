import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Auth } from 'src/app/models/Auth.model';
import { Customer } from 'src/app/models/Customer.model';
import { Seller } from 'src/app/models/Seller.model';
import { User } from 'src/app/models/User.model';

const API_URL = "http://localhost:8080/api/v1/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${API_URL}/login`, { email, password },{observe:'response'})
    .pipe(
      map((res: HttpResponse<Auth>)=>{
        console.log(res.body);
        
      })
    
    );
  }


  registerCustomer(request: Auth): Observable<Customer> {
    return this.http.post<Customer>(`${API_URL}/register-customer`, request);
  }

  registerSeller(request: Auth): Observable<Seller> {
    return this.http.post<Seller>(`${API_URL}/register-seller`, request);
  }
  singup(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}`, user);
  }
}
