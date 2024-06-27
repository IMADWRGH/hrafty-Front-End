import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from 'src/app/models/Service.model';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent  {

  services: Service[];
  data = UserStorageService.getUser();
  constructor(private Service: ServiceService) { }
 
  ngOnInit(): void {
    this.Service.getServices(this.data.seller.id).subscribe((res: any) => {
    this.services = res;
    console.log(res);
    
    });
  }

}
