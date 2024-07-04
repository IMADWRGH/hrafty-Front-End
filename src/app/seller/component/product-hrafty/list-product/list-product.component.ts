import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/seller/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { SellerService } from 'src/app/seller/services/seller.service';
import { Seller } from 'src/app/models/Seller.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products: Product[] = [];
  sellerId: number;
  userId = UserStorageService.getUserId();
  datasource: MatTableDataSource<Product>;
  // columns: string[] = ['Image','Name', 'Description', 'Price','Action'];
  columns: string[] = ['Name', 'Description', 'Price','Action'];
  constructor(private productService: ProductService,
     private dialog: MatDialog,
    private sellerService:SellerService) {
    this.loadProduct();
  }


  loadProduct() {
    this.productService.getAllProducts(this.sellerId).subscribe((reponse: Product[]) => {
      this.products = reponse;
      this.datasource = new MatTableDataSource<Product>(this.products);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }


  getSellerId(): void {
    this.sellerService.getSellerData(this.userId).subscribe({
      next: (data: Seller) => {
        this.sellerId = data.id;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  detailProduct(id: number) {

  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.loadProduct();
  }


  editProduct(id: number) {
    this.openpopup(id, "Edit Product");
    console.log(id);

  }

  addProduct() {
    this.openpopup(0, "Add new  Product");
  }
  openpopup(id: number, title: string) {
    var _add = this.dialog.open(AddProductComponent, {
      exitAnimationDuration: '1000ms',
      width: '80%',
      height: '80%',
      data: {
        title: title,
        id: id
      },
    });
    _add.afterClosed().subscribe((result) => {
      this.loadProduct();
    });
  }
  Filterchange($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }

}
