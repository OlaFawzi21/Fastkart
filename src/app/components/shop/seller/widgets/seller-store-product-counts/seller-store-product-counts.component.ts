import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-seller-store-product-counts',
    imports: [TranslateModule, RouterModule],
    templateUrl: './seller-store-product-counts.component.html',
    styleUrl: './seller-store-product-counts.component.scss'
})
export class SellerStoreProductCountsComponent {

  @Input() store: Stores;

}
