import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Service } from 'src/app/models/Service.model';
import { ServiceService } from 'src/app/seller/services/service.service';
import { SellerService } from 'src/app/seller/services/seller.service';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';
import { AddServiceComponent } from '../add-service/add-service.component';
import { Seller } from 'src/app/models/Seller.model';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  services: Service[] = [];
  userId = UserStorageService.getUserId();
  sellerId: number;
  datasource: MatTableDataSource<Service>;
  columns: string[] = ['Image','Name', 'Description', 'Price', 'Category', 'Status', 'Action'];

  constructor(
    private serviceService: ServiceService,
    private dialog: MatDialog,
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.getSellerId();
  }

  getSellerId(): void {
    this.sellerService.getSellerData(this.userId).subscribe({
      next: (data: Seller) => {
        this.sellerId = data.id;
        this.loadServices();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadServices() {
    if (!this.sellerId) {
      console.error('Seller ID is not available yet.');
      return;
    }

    this.serviceService.getServices(this.sellerId).subscribe({
      next: (response: Service[]) => {
        this.services = response;
        this.datasource = new MatTableDataSource<Service>(this.services);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  detailService(id: number) {
  }

  deleteService(id: number) {
    this.serviceService.deleteService(id).subscribe({
      next: (res) => {
        console.log(res);
        this.loadServices();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editService(id: number) {
    this.openpopup(id, "Edit Service");
    console.log(id);
  }

  addService() {
    this.openpopup(0, "Add new Service");
  }

  openpopup(id: number, title: string) {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      exitAnimationDuration: '1000ms',
      width: '80%',
      height: '80%',
      data: {
        title: title,
        id: id
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadServices();
    });
  }

  Filterchange($event: KeyboardEvent) {
  }
}
