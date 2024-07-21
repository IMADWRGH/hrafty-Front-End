import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/Customer.model';
const API_URL = "http://localhost:8080/api/v1/customer/";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient) { }

  getCustomerData(id: number): Observable<Customer> {
    return this.http.get<Customer>(API_URL + id);
  }

}
