import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Seller } from 'src/app/models/Seller.model';
import { UserStorageService } from 'src/app/shared/services/storage/user-storage.service';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-header-seller',
  templateUrl: './header-seller.component.html',
  styleUrls: ['./header-seller.component.css']
})
export class HeaderSellerComponent implements OnInit, OnDestroy {
  userId = UserStorageService.getUserId();
  seller?: Seller;
  isCustomerLoggedIn = false;
  isSellerLoggedIn = false;
  isMenuOpen = false;
  user = UserStorageService.getUser();

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.getSeller();
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

  logOut(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  getSeller(): void {
    this.sellerService.getSellerData(this.userId).subscribe({
      next: (data: Seller) => {
        this.seller = data;
      },
      error: (error) => {
        console.error('Failed to load seller data:', error);
      }
    });
  }

  getSellerImage(): string {
    return this.seller?.imageURL && this.seller.imageURL.trim() !== ''
      ? this.seller.imageURL
      : '/assets/images/profile.png';
  }
}
