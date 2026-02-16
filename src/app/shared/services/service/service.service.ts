import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/Service.model';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiBaseUrl}/service/`;
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${API_URL}get`);
  }
}
