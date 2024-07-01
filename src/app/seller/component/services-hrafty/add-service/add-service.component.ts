import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from 'src/app/models/Service.model';
import { ServiceService } from 'src/app/seller/services/service.service';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {
  user = UserStorageService.getUser();
  sellerId: number = UserStorageService.getUserId();
  inputdata: any;
  newService: Service;
  editService: Service;
  isEditMode: boolean = false;
  serviceForm?: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: ServiceService, private fb: FormBuilder, private ref: MatDialogRef<AddServiceComponent>, private serviceImpl: ServiceService) {
  }

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
      type: ['', Validators.required],
      status: [false]
    });
    if (this.inputdata && this.inputdata.service) {
      this.isEditMode = true;
      this.serviceForm.patchValue(this.inputdata.service);
    }
  }

  onSubmit(): void {
    const serviceData = {
      ...this.serviceForm.value,
      sellerId: this.sellerId
    };

    if (this.isEditMode) {
      this.service.updateService(serviceData).subscribe({
        next: (res) => {
          this.closepopup();
        }
      });
    } else {
      this.service.addService(serviceData).subscribe({
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
    this.serviceImpl.getService(id).subscribe({
      next: (res) => {
        this.editService = res;
        this.serviceForm.setValue({
          id: this.editService.id,
          image: this.editService.image,
          name: this.editService.name,
          description: this.editService.description,
          price: this.editService.price,
          type: this.editService.type,
          status: this.editService.status
        });
      }
    });
  }
}
