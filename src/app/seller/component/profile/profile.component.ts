import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth.model';
import { User } from 'src/app/models/User.model';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  constructor() { }
  data: Auth;
  ngOnInit(): void {
    this.data = UserStorageService.getUser();
  }


}
