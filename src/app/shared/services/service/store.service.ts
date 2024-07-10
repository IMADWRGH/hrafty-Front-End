import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
const API_URL = "http://localhost:8080/api/v1/user/";
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAllProduct(category?: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${API_URL}products${category ? '/category/' + category : ''}`);
  }

  // getAllCategories(): Observable<Array<string>> {
  //   return this.http.get<Array<Product>>(`${API_URL}product-categories`).pipe(
  //     map(products => {
  //       const categories = [...new Set(products.map(product => product.category))];
  //       console.log('caregory'+categories);
  //       return categories;
  //     })
  //   );
  // }
  
  getAllCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${API_URL}product-categories`);
  }
}
