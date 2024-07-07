import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';
import { ProductService } from 'src/app/seller/services/product.service';
import { Product } from 'src/app/models/Product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  sellerId: number = UserStorageService.getUserId();
  inputdata: any;
  newProduct: Product;
  editProduct: Product;
  isEditMode: boolean = false;
  productForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ps: ProductService, private fb: FormBuilder, private ref: MatDialogRef<AddProductComponent>) {
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      this.setpopudate(this.inputdata.id);
    }
    this.productForm = this.fb.group({
      id: [null],
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
    });
    if (this.inputdata && this.inputdata.service) {
      this.isEditMode = true;
      this.productForm.patchValue(this.inputdata.service);
    }
  }

  onSubmit(): void {
    const productData = {
      ...this.productForm.value,
      sellerId: this.sellerId
    };

    if (this.isEditMode) {
      this.ps.updateProduct(productData).subscribe({
        next: (res) => {
          this.closepopup();
        }
      });
    } else {
      this.ps.addProduct(productData).subscribe({
        next: (res) => {
          this.closepopup();
        }
      });
    }
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  setpopudate(id: number) {
    this.ps.getProduct(id).subscribe({
      next: (res) => {
        this.editProduct = res;
        this.productForm.setValue({
          id: this.editProduct.id,
          image: this.editProduct.image,
          name: this.editProduct.name,
          description: this.editProduct.description,
          price: this.editProduct.price,
        });
      }
    });
  }

}
