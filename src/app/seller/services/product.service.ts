import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
const API_URL = "http://localhost:8080/api/v1/product/";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${API_URL}add`, formData, {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
    });
  }

  updateProduct(formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${API_URL}update`, formData, {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
    });
  }

  // addProduct(product:Product):Observable<Product>{
  //   return this.http.post<Product>(`${API_URL}add`,product);
  // }

  deleteProduct(id:number){
    return this.http.delete(`${API_URL}delete/`+id);
  }

  getProducts(id:number):Observable<Product[]>{
    return this.http.get<Product[]>(`${API_URL}getAll/`+id);
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}getAll/`);
  }

  // updateProduct(id:number):Observable<Product>{
  //   return this.http.get<Product>(`${API_URL}update/`+id);
  // }

  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${API_URL}`+id);
  }
}
