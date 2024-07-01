import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/models/Service.model';
import { ServiceService } from 'src/app/seller/services/service.service';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../add-service/add-service.component';
@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  services: Service[] = [];
  data = UserStorageService.getUser();
  sellerId: number = UserStorageService.getUserId();
  datasource: MatTableDataSource<Service>;
  columns: string[] = ['Name', 'Description', 'Price', 'Type', 'Status', 'Action'];
  constructor(private serviceService: ServiceService, private dialog: MatDialog) {
    this.loadServices();
  }
  loadServices() {
    this.serviceService.getServices(this.sellerId).subscribe((reponse: Service[]) => {
      this.services = reponse;
      this.datasource = new MatTableDataSource<Service>(this.services);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  detailService(id: number) {

  }

  deleteService(id: number) {
    this.serviceService.deleteService(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.loadServices();
  }


  editService(id: number) {
    this.openpopup(id, "Edit Service");
    console.log(id);

  }

  addService() {
    this.openpopup(0, "Add new  Service");
  }
  openpopup(id: number, title: string) {
    var _add = this.dialog.open(AddServiceComponent, {
      exitAnimationDuration: '1000ms',
      width: '80%',
      height: '80%',
      data: {
        title: title,
        id: id
      },
    });
    _add.afterClosed().subscribe((result) => {
      this.loadServices();
    });
  }
  Filterchange($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }



}
