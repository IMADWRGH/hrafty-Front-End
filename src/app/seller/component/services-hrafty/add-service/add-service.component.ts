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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: ServiceService, private fb: FormBuilder, private ref: MatDialogRef<AddServiceComponent>, private serviceImpl: ServiceService) {
  }
  serviceForm?: FormGroup;


  onSubmit(): void {
    const serviceData = {
      ...this.serviceForm.value,
      sellerId: this.sellerId
    };
    console.log(serviceData);

    this.service.addService(serviceData).subscribe({
      next: (res) => {
        console.log(res);
        this.closepopup()
      }
    });
  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      this.setpopudate(this.inputdata.id);
    }
    this.serviceForm = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      type: ['', Validators.required],
      status: [false]
    });
    this.inputdata = this.data;
  }



  closepopup() {
    this.ref.close('Closed using function');
  }

  setpopudate(id: number) {
    this.serviceImpl.getService(id).subscribe({
      next: (res) => {
        this.editService = res;
        this.serviceForm.setValue({
          image: this.editService.image,
          name: this.editService.name,
          description: this.editService.description,
          price: this.editService.price,
          type: this.editService.type,
          status: this.editService.status
        });
      }

    })
  }

  setpopupdatedata(id: number) {
    this.serviceImpl.getService(id).subscribe({
      next: (res) => {
        this.editService = res;
        this.serviceForm.setValue({
          name: this.editService.name,
          description: this.editService.description,
          type: this.editService.type,
          price: this.editService.price,
          status: this.editService.status,
        })
      },
      error: (err) => {
        console.log("error in setpopupdatedata");
      }
    })
  }

}
