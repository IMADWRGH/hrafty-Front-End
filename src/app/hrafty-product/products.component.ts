import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/service/cart.service';
import { StoreService } from 'src/app/shared/services/service/store.service';
import { Product } from '../models/Product.model';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  
  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProduct();
  }
  ngOnDestroy(): void {
    if (this.productSubcription) {
      this.productSubcription.unsubscribe();
    }
  }

  clos = 3;
  rows = ROWS_HEIGHT[this.clos]
  categories: string | undefined;
  products: Array<Product> | undefined;
  count = 25;
  category: string | undefined;
  productSubcription: Subscription | undefined
  onColsCountChange(colsNUm: number): void {
    this.clos = colsNUm;
    this.rows = ROWS_HEIGHT[this.clos];
  }
  onShowCategory(category: string): void {
    this.category = category;
    this.getProduct();
    console.log(category)
  }
  // product: product.images,
  onAddToCart(product: Product): void {
    this.cartService.addTocart({
     product: null,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  getProduct(): void {
    this.productSubcription = this.storeService.getAllProduct(this.category).subscribe((_product) => {
      this.products = _product;
    });
   // console.log(this.productSubcription)
  }


  onSortCountChange(newSort: string) {
    // this.sort = newSort;
    this.getProduct();
  }
  onItemsCountChange(newCount: number): void {
    // this.count = newCount.toString();
    this.getProduct();
  }



}
