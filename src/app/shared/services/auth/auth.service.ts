import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Auth } from 'src/app/models/Auth.model';
import { Seller } from 'src/app/models/Seller.model';
import { User } from 'src/app/models/User.model';
import { UserStorageService } from '../storage/user-storage.service';

const API_URL = "http://localhost:8080/api/v1/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private http: HttpClient, private userStorage: UserStorageService) { }

  login(email: string, password: string): Observable<void> {
    return this.http.post<Auth>(`${API_URL}/login`, { email, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          const authResponse: any = res.body!;
          if (authResponse && authResponse.token && authResponse.user) {
            this.userStorage.saveUser(authResponse.user);
            this.userStorage.saveToken(authResponse.token);
          } else {
            throw new Error('Invalid server response');
          }
        })
      );
  }


 
  
  registerCustomers(formData: FormData): Observable<any> {
    return this.http.post(`${API_URL}/register-customer`, formData, {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
      withCredentials: false 
    })
  }
  registerSeller(formData: FormData): Observable<Seller> {
    return this.http.post<Seller>(`${API_URL}/register-seller`, formData);
  }
  singup(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}`, user);
  }

  // registe(user: User, customer: Customer, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('user', JSON.stringify(user));
  //   formData.append('customer', JSON.stringify(customer));
  //   formData.append('file', file, file.name);

  //   return this.http.post<any>(`${API_URL}/register-customer`, formData);
  // }


  // registerCustomer(request: Auth): Observable<Customer> {
  //   return this.http.post<Customer>(`${API_URL}/register-customer`, request);
  // }
}
