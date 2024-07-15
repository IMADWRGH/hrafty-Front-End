import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Seller } from 'src/app/models/Seller.model';
import { Service } from 'src/app/models/Service.model';
import { SellerService } from 'src/app/seller/services/seller.service';
import { ServiceService } from 'src/app/seller/services/service.service';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  userId: number = UserStorageService.getUserId();
  inputdata: any;
  newService: Service;
  editService: Service;
  isEditMode: boolean = false;
  serviceForm?: FormGroup;
  sellerId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService,
    private fb: FormBuilder,
    private ref: MatDialogRef<AddServiceComponent>,
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      this.setpopudate(this.inputdata.id);
    }
    this.serviceForm = this.fb.group({
      id: [null],
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      status: [false]
    });
    if (this.inputdata && this.inputdata.service) {
      this.isEditMode = true;
      this.serviceForm.patchValue(this.inputdata.service);
    }
    this.getSellerId();
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

  onSubmit(): void {
    if (!this.sellerId) {
      console.log('Seller ID not available yet.');
      return;
    }

    const serviceData = {
      ...this.serviceForm.value,
      sellerId: this.sellerId
    };

    if (this.isEditMode) {
      this.service.updateService(serviceData).subscribe({
        next: (res) => {
          this.closepopup();
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.service.addService(serviceData).subscribe({
        next: (res) => {
          console.log(res);
          this.closepopup();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  setpopudate(id: number) {
    this.service.getService(id).subscribe({
      next: (res) => {
        this.editService = res;
        this.serviceForm.setValue({
          id: this.editService.id,
          image: this.editService.image,
          name: this.editService.name,
          description: this.editService.description,
          price: this.editService.price,
          category:this.editService.category,
          status: this.editService.status
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
