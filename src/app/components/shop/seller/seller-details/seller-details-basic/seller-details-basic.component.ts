import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../../shared/interface/core.interface';
import { Stores } from '../../../../../shared/interface/store.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../collection/widgets/sidebar/sidebar.component';
import { SellerStoreLogoComponent } from '../../widgets/seller-store-logo/seller-store-logo.component';
import { SellerStoreNameComponent } from '../../widgets/seller-store-name/seller-store-name.component';
import { SellerStoreRatingComponent } from '../../widgets/seller-store-rating/seller-store-rating.component';
import { SellerStoreDescriptionComponent } from '../../widgets/seller-store-description/seller-store-description.component';
import { SellerStoreSocialLinksComponent } from '../../widgets/seller-store-social-links/seller-store-social-links.component';
import { CollectionProductsComponent } from '../../../collection/widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-seller-details-basic',
    imports: [CommonModule, SidebarComponent, SellerStoreLogoComponent,
        SellerStoreNameComponent, SellerStoreRatingComponent, SellerStoreDescriptionComponent,
        SellerStoreSocialLinksComponent, CollectionProductsComponent
    ],
    templateUrl: './seller-details-basic.component.html',
    styleUrl: './seller-details-basic.component.scss'
})
export class SellerDetailsBasicComponent {

  @Input() filter: Params;
  @Input() store: Stores;

  public storageURL = environment.storageURL;

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

}
