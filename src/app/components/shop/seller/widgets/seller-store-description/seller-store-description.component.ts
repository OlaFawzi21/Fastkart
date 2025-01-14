import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
    selector: 'app-seller-store-description',
    imports: [],
    templateUrl: './seller-store-description.component.html',
    styleUrl: './seller-store-description.component.scss'
})
export class SellerStoreDescriptionComponent {

  @Input() store: Stores;

}
