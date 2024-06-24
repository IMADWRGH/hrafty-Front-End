import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth.model';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userData!:Auth;
  constructor(private data:UserStorageService){}
  
  ngOnInit(): void {
    this.data.userData$.subscribe(data => {
      this.userData = data;
      console.log(data);
      
    });
  }

  
}
