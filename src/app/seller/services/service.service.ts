import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/Service.model';

const API_URL = "http://localhost:8080/api/v1/seller/";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getServices(id: number): Observable<Service[]> {
    return this.http.get<Service[]>(API_URL + "getAll/" + id);
  }
  getService(id: number): Observable<Service> {
    return this.http.get<Service>(API_URL + "get/" + id);
  }

  addService(service: Service, files: File[]): Observable<Service> {
    const formData: FormData = new FormData();
    formData.append('service', JSON.stringify(service));
    files.forEach(file => formData.append('files', file, file.name));

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.post<Service>(`${API_URL}add`, formData, { headers });
  }

  deleteService(id:number){
    return this.http.delete(API_URL + "delete/" + id);
  }
  updateService(service:Service,files:File[]){
    const formData: FormData = new FormData();
    formData.append('service', JSON.stringify(service));
    files.forEach(file => formData.append('files', file, file.name));
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.put<Service>(`${API_URL}update`, formData, { headers });
  }
}
