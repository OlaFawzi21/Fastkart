import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { StoreService } from '../../../../../shared/services/store.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SkeletonSellerStoreComponent } from '../skeleton-seller-store/skeleton-seller-store.component';
import { SellerStoreLogoComponent } from '../../widgets/seller-store-logo/seller-store-logo.component';
import { SellerStoreRatingComponent } from '../../widgets/seller-store-rating/seller-store-rating.component';
import { SellerStoreNameComponent } from '../../widgets/seller-store-name/seller-store-name.component';
import { SellerStoreProductCountsComponent } from '../../widgets/seller-store-product-counts/seller-store-product-counts.component';
import { SellerContactDetailsComponent } from '../../widgets/seller-contact-details/seller-contact-details.component';
import { SellerStoreProductsComponent } from '../../widgets/seller-store-products/seller-store-products.component';
import { NoDataComponent } from '../../../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-seller-store-basic',
    imports: [TranslateModule, RouterModule, SkeletonSellerStoreComponent,
        SellerStoreLogoComponent, SellerStoreRatingComponent, SellerStoreNameComponent,
        SellerStoreProductCountsComponent, SellerContactDetailsComponent, SellerStoreProductsComponent, NoDataComponent
    ],
    templateUrl: './seller-store-basic.component.html',
    styleUrl: './seller-store-basic.component.scss'
})
export class SellerStoreBasicComponent {

  @Input() stores: Stores[];
  @Input() skeletonItems: number[];

  constructor(public storeService: StoreService) { }

}
