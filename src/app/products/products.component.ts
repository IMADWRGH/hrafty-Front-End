import { Component, OnInit } from '@angular/core';
import { ProductService } from '../seller/services/product.service';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:Product[]=[];
constructor(private ps:ProductService){}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

getAllProduct(){
  this.ps.getAllProducts().subscribe((data:Product[])=>{
    this.products=data;
  });
}

}
