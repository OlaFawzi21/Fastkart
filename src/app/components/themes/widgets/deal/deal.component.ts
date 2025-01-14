import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductState } from '../../../../shared/state/product.state';
import { Product } from '../../../../shared/interface/product.interface';
import { Deal, DealOfDays } from '../../../../shared/interface/theme.interface';
import { AddToWishlist, DeleteWishlist } from '../../../../shared/action/wishlist.action';
import { AddToCompare } from '../../../../shared/action/compare.action';
import * as data from '../../../../shared/data/owl-carousel'
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../shared/pipe/currency-symbol.pipe';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-deal',
    imports: [CommonModule, CarouselModule, RouterModule,
        NgbModule, TranslateModule, CurrencySymbolPipe
    ],
    templateUrl: './deal.component.html',
    styleUrl: './deal.component.scss'
})
export class DealComponent {

  @Input() data?: DealOfDays;
  public storageURL = environment.storageURL;

  product$: Observable<Product[]> = inject(Store).select(ProductState.productByIds);

  @Output() isDeal: EventEmitter<boolean> = new EventEmitter();

  public dealSlider = data.singleSlider
  public deals: Deal[] = [];

  constructor(public config: NgbRatingConfig, private store: Store) {
		config.max = 5;
		config.readonly = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    let dealsArray = changes['data']?.currentValue?.deals;
    this.product$.subscribe(products => {
      dealsArray.map((deal:any) => {
        deal.product = products.find(product => product.id === deal.product_id)
      })
      this.deals = dealsArray;
      this.isDeal.emit(this.deals?.length ? true : false)
      this.startTimers();
    });
  }

  startTimers() {
    for (let counterItem of this.deals) {
      const endDate = new Date(counterItem.end_date).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = endDate - currentTime;

      if (timeDifference > 0) {
        counterItem.remainingTime = this.calculateRemainingTime(timeDifference);
        setInterval(() => {
          counterItem.remainingTime = this.calculateRemainingTime(endDate - new Date().getTime());
        }, 1000);
      }
    }
  }

  calculateRemainingTime(timeDifference: number) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  addToWishlist(product: Product){
    product['is_wishlist'] = !product['is_wishlist'];
    let action = product['is_wishlist']? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }

  addToCompare(id: number) {
    this.store.dispatch(new AddToCompare({ product_id: id }));
  }

}
