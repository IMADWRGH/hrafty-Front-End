import { Portal } from '@angular/cdk/portal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/Product.model';
const API_URL = "http://localhost:8080/api/v1/product/";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(product: Product, files: File[]): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append('product', JSON.stringify(product));
    files.forEach(file => formData.append('files', file, file.name));

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.post<Product>(`${API_URL}add`, formData, { headers });
  }

  updateProduct(product: Product, files: File[]): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append('product', JSON.stringify(product));
    files.forEach(file => formData.append('files', file, file.name));
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.put<Product>(`${API_URL}update`, formData, { headers });
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
