import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { Product } from '../../../../../shared/interface/product.interface';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { StoreInformationComponent } from '../widgets/store-information/store-information.component';
import { TrendingProductsComponent } from '../widgets/trending-products/trending-products.component';
import { ProductBannerComponent } from '../widgets/product-banner/product-banner.component';

@Component({
    selector: 'app-product-details-sidebar',
    imports: [CommonModule, StoreInformationComponent, TrendingProductsComponent,
        ProductBannerComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class ProductSidebarComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() product: Product;

  public storageURL = environment.storageURL;

}
