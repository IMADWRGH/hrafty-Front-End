import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/seller/services/product.service';
import { StoreService } from 'src/app/shared/services/service/store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() ShowCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: string[] | undefined

  constructor(private store: StoreService) { }


  ngOnInit(): void {
    this.categoriesSubscription = this.store.getAllCategories().subscribe((reponse: Array<string>) => {
      this.categories = reponse;
      console.log('the list of caterogies' + this.categories);
    }
    );
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
  onShowCategory(category: string): void {
    console.log("category that has select "+category);

    this.ShowCategory.next(category);


  }
}
