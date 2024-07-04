import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup; 
  cities: string[] = ['City A', 'City B', 'City C']; 

  items = [
    { name: 'Super Marché', image: '/assets/images/img1.jpg' },
    { name: 'Patisserie', image: '/assets/images/ff.jfif' },
    { name: 'Restaurant', image: '/assets/images/R.jfif' },
    { name: 'Service Coursier', image: '/assets/images/img1.jpg' },
    { name: 'Notre Service', image: '/assets/images/image2.jfif' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: [''],
      city: [''],
      serviceType: ['']
    });
  }

  Search() {
    console.log('Searching...');
  }
}
