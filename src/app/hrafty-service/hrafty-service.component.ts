import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/services/service/service.service';
import { Service } from '../models/Service.model';

@Component({
  selector: 'app-hrafty-service',
  templateUrl: './hrafty-service.component.html',
  styleUrls: ['./hrafty-service.component.css']
})
export class HraftyServiceComponent implements OnInit {
  serviceList: Service[] = [];
  constructor(private Service: ServiceService) { }


  ngOnInit(): void {
    this.Service.getAllServices().subscribe({
      next: (data) => {
        this.serviceList = data;
        console.log(data);
      },
      error: (err) => {
        console.log("can't get data ");

      }
    })
  }


}
