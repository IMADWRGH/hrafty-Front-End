import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/Address.model';
import { Seller } from 'src/app/models/Seller.model';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiBaseUrl}/seller/`;
const API = `${environment.apiBaseUrl}/address/`;


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }



  getSellerData(id: number): Observable<Seller> {
    return this.http.get<Seller>(API_URL + id);
  }

  getAddressSeller(id: number): Observable<Address> {
    return this.http.get<Address>(API + id);
  }
}
