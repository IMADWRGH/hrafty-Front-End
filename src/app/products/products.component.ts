import { Component } from '@angular/core';
import { ProductService } from '../seller/services/product.service';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
product:Product[]=[];
clos: any;
constructor(private sp:ProductService){}
  products:any = [
    {
      image1: '/assets/images/img1.jpg',
      image2: '/assets/images/img1.jpg',
      title: "Men's Shirt",
      price: '$20.00',
      rating: 3
    },
    {
      image1: '/assets/images/img1.jpg',
      image2: '/assets/images/img1.jpg',
      title: "Women's Tshirt",
      price: '$19.00',
      rating: 4
    }
  ];
}
