import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetStoreProducts } from '../../../../shared/action/product.action';
import { GetStores } from '../../../../shared/action/store.action';
import { BreadcrumbComponent } from '../../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { PaginationComponent } from '../../../../shared/components/widgets/pagination/pagination.component';
import { Breadcrumb } from '../../../../shared/interface/breadcrumb';
import { StoresModel } from '../../../../shared/interface/store.interface';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { StoreService } from '../../../../shared/services/store.service';
import { StoreState } from '../../../../shared/state/store.state';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { SellerStoreBasicComponent } from './seller-store-basic/seller-store-basic.component';
import { SellerStoreClassicComponent } from './seller-store-classic/seller-store-classic.component';

@Component({
    selector: 'app-seller-store',
    imports: [CommonModule, BreadcrumbComponent, SellerStoreBasicComponent,
        SellerStoreClassicComponent, PaginationComponent
    ],
    templateUrl: './seller-store.component.html',
    styleUrl: './seller-store.component.scss'
})
export class SellerStoreComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  store$: Observable<StoresModel> = inject(Store).select(StoreState.store);

  public breadcrumb: Breadcrumb = {
    title: "Seller Stores",
    items: [{ label: 'Seller Stores', active: true }]
  }
  public totalItems: number = 0;
  public filter = {
    'status': 1,
    'page': 1, // Current page number
    'paginate': 9, // Display per page,
  };

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);
  public layout: string = 'basic_store';

  constructor(public store: Store, private route: ActivatedRoute,
    public storeService: StoreService){

    // Params For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      this.store.dispatch(new GetStores(this.filter));
      this.store$.subscribe(store => this.totalItems = store?.total);

      if(params['layout']) {
        this.layout = params['layout'];
      } else {
        this.themeOptions$.subscribe(option => {
          this.layout = option.seller && option.seller.store_layout ? option.seller.store_layout : 'basic_store';
        });
      }
    });

    this.store$.subscribe(store => {
      const storeIds = store?.data.map(store => store.id);
      if(Array.isArray(storeIds) && storeIds.length){
        this.store.dispatch(new GetStoreProducts({ status: 1, store_ids: storeIds?.join(',')}));
      }
    })
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.store.dispatch(new GetStores(this.filter));
  }

}
