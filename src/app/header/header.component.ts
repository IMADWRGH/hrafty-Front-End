import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserStorageService } from '../shared/services/storage/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCustomerLoggedIn = false;
  isSellerLoggedIn = false;
  isMenuOpen = false;

  private destroy$ = new Subject<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isSellerLoggedIn = UserStorageService.isSellerLoggedIn();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
