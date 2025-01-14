import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { StoreService } from '../../../../../shared/services/store.service';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonSellerStoreComponent } from '../skeleton-seller-store/skeleton-seller-store.component';
import { SellerContactDetailsComponent } from '../../widgets/seller-contact-details/seller-contact-details.component';
import { SellerStoreNameComponent } from '../../widgets/seller-store-name/seller-store-name.component';
import { SellerStoreRatingComponent } from '../../widgets/seller-store-rating/seller-store-rating.component';
import { RouterModule } from '@angular/router';
import { SellerStoreLogoComponent } from '../../widgets/seller-store-logo/seller-store-logo.component';
import { NoDataComponent } from '../../../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-seller-store-classic',
    imports: [TranslateModule, RouterModule, SkeletonSellerStoreComponent,
        SellerContactDetailsComponent, SellerStoreNameComponent, SellerStoreRatingComponent,
        SellerStoreLogoComponent, NoDataComponent
    ],
    templateUrl: './seller-store-classic.component.html',
    styleUrl: './seller-store-classic.component.scss'
})
export class SellerStoreClassicComponent {

  @Input() stores: Stores[];
  @Input() skeletonItems: number[];

  constructor(public storeService: StoreService) { }

}
