import { HttpClient } from '@angular/common/http';
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

  addService(service: Service): Observable<Service> {
    return this.http.post<Service>(API_URL + "add", service);
  }

  deleteService(id:number){
    return this.http.delete(API_URL + "delete/" + id);
  }
  updateService(id:number){
    return this.http.put(API_URL + "update/" + id, id);
  }
}
