import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
const API_URL = "http://localhost:8080/api/v1/product/";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(API_URL,product);
  }

  deleteProduct(id:number){
    return this.http.delete(`${API_URL}/detele`+id);
  }

  getAllProducts(id:number):Observable<Product[]>{
    return this.http.get<Product[]>(API_URL+id);
  }

  updateProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${API_URL}update/`+id);
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${API_URL}`+id);
  }
}
