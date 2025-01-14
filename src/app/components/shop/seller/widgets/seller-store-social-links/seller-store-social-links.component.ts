import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-seller-store-social-links',
    imports: [TranslateModule],
    templateUrl: './seller-store-social-links.component.html',
    styleUrl: './seller-store-social-links.component.scss'
})
export class SellerStoreSocialLinksComponent {

  @Input() store: Stores;

}
