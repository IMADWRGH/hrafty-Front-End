import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../shared/services/storage/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userId = UserStorageService.getUserId()
  constructor(private route: Router) { }
  isCustomerLoggedIn: boolean;
  isSellerLoggedIn: boolean;
  ngOnInit(): void {
    this.route.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isSellerLoggedIn = UserStorageService.isSellerLoggedIn();
    })
  }
  }
