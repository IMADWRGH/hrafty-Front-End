import { Component, OnInit, ViewChild } from '@angular/core';
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
export class ListProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products: Product[] = [];
  sellerId!: number;
  userId = UserStorageService.getUserId();
  datasource!: MatTableDataSource<Product>;
  columns: string[] = ['Image', 'Name', 'Description','Category', 'Price', 'Action'];
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.getSellerId();
  }

  loadProduct() {
    if (!this.sellerId) {
      console.error('Seller ID is not available yet.');
      return;
    }

    this.productService.getProducts(this.sellerId).subscribe({
      next: (response: Product[]) => {
        this.products = response;
        console.log(response);
        
        this.datasource = new MatTableDataSource<Product>(this.products);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getSellerId(): void {
    this.sellerService.getSellerData(this.userId).subscribe({
      next: (data: Seller) => {
        this.sellerId = data.id;
        this.loadProduct();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  detailProduct(id: number) {
    // Implementation for detailProduct
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.loadProduct(); // Reload products after deletion
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editProduct(id: number) {
    this.openpopup(id, "Edit Product");
  }

  addProduct() {
    this.openpopup(0, "Add new Product");
  }

  openpopup(id: number, title: string) {
    const _add = this.dialog.open(AddProductComponent, {
      exitAnimationDuration: '1000ms',
      width: '80%',
      height: '80%',
      data: {
        title: title,
        id: id
      },
    });

    _add.afterClosed().subscribe(() => {
      this.loadProduct();
    });
  }

  Filterchange($event: KeyboardEvent) {
    // Implementation for filter change
  }
}
