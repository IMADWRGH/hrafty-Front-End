import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from 'src/app/models/Service.model';

const API_URL = "http://localhost:8080/api/v1/user/";
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResultsSubject = new BehaviorSubject<Service[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  constructor(private http: HttpClient) { }

  search(city?: string, category?: string): Observable<Service[]> {
    let url = `${API_URL}services`;
    if (city && category) {
      url += `/city/${city}/category/${category}`;
    } else if (city) {
      url += `/city/${city}`;
    } else if (category) {
      url += `/category/${category}`;
    }
    return this.http.get<Service[]>(url);
  }


  getAllCategories(): Observable<String[]> {
    return this.http.get<String[]>(`${API_URL}service-categories`);
  }
  getAllCities(): Observable<String[]> {
    return this.http.get<String[]>(`${API_URL}cities`);
  }

  updateSearchResults(results: Service[]) {
    this.searchResultsSubject.next(results);
  }

}
