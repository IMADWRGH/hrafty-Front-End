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

  constructor(private route:Router ,private fb: FormBuilder,private data:SearchService){}
  form: FormGroup; 
  cities: string[] =[];
  categories:string[]=[];
 
  ngOnInit() {
    this.form = this.fb.group({
      city: [''],
      serviceType: ['']
    });
    this.getCities();
    this.getCategories();
  }


  getCities(){
    this.data.getAllCities().subscribe({
      next: (data:string[]) => {
        this.cities = data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  getCategories(){
    this.data.getAllCategories().subscribe({
      next: (data:string[]) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  items = [
    { name: 'Super Marché', image: '/assets/images/img1.jpg' },
    { name: 'Patisserie', image: '/assets/images/ff.jfif' },
    { name: 'Restaurant', image: '/assets/images/R.jfif' },
    { name: 'Service Coursier', image: '/assets/images/img1.jpg' },
    { name: 'Notre Service', image: '/assets/images/image2.jfif' }
  ];

  Search() {
    this.data.search(this.form.value).subscribe({
      next:(results:Service[])=>{
        this.data.updateSearchResults(results);
        this.route.navigate(['/test']);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
