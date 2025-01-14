import { Component, Input } from '@angular/core';
import { Params } from '../../../../../shared/interface/core.interface';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../collection/widgets/sidebar/sidebar.component';
import { SellerStoreLogoComponent } from '../../widgets/seller-store-logo/seller-store-logo.component';
import { SellerStoreNameComponent } from '../../widgets/seller-store-name/seller-store-name.component';
import { SellerStoreRatingComponent } from '../../widgets/seller-store-rating/seller-store-rating.component';
import { SellerStoreDescriptionComponent } from '../../widgets/seller-store-description/seller-store-description.component';
import { SellerStoreSocialLinksComponent } from '../../widgets/seller-store-social-links/seller-store-social-links.component';
import { CollectionProductsComponent } from '../../../collection/widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-seller-details-classic',
    imports: [TranslateModule, RouterModule, SidebarComponent,
        SellerStoreLogoComponent, SellerStoreNameComponent, SellerStoreRatingComponent,
        SellerStoreDescriptionComponent, SellerStoreSocialLinksComponent, CollectionProductsComponent
    ],
    templateUrl: './seller-details-classic.component.html',
    styleUrl: './seller-details-classic.component.scss'
})
export class SellerDetailsClassicComponent {

  @Input() filter: Params;
  @Input() store: Stores;
  
}
