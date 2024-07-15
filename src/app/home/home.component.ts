import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from '../shared/services/service/search.service';
import { Service } from '../models/Service.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  cities: string[] = [];
  categories: string[] = [];
  items = [
    { id: 1, category: 'test', image: '/assets/images/img1.jpg' },
    { id: 2, category: 'Patisserie', image: '/assets/images/ff.jfif' },
    { id: 3, category: 'Restaurant', image: '/assets/images/R.jfif' },
    { id: 4, category: 'Service Coursier', image: '/assets/images/img1.jpg' },
    { id: 5, category: 'Notre Service', image: '/assets/images/image2.jfif' }
  ];
  cards: Service[] = [];
  selectedCategory: string | null = null;

  constructor(private fb: FormBuilder, private data: SearchService, private route: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      city: [''],
      category: ['']
    });
    this.getCities();
    this.getCategories();
  }

  getCities() {
    this.data.getAllCities().subscribe({
      next: (data: string[]) => {
        this.cities = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getCategories() {
    this.data.getAllCategories().subscribe({
      next: (data: string[]) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  Search() {
    const { city, category } = this.form.value;
    this.data.search(city, category).subscribe({
      next: (results: Service[]) => {
        this.data.updateSearchResults(results);
        this.route.navigate(['/test']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onCategoryClick(category: string) {
    this.selectedCategory = category;
    this.data.search(null, category).subscribe({
      next: (data: Service[]) => {
        this.cards = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
