import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { RouterModule } from '@angular/router';
import { TitleCasePipe } from '../../../../../shared/pipe/title-case.pipe';

@Component({
    selector: 'app-seller-store-name',
    imports: [RouterModule, TitleCasePipe],
    templateUrl: './seller-store-name.component.html',
    styleUrl: './seller-store-name.component.scss'
})
export class SellerStoreNameComponent {

  @Input() store: Stores;

}
