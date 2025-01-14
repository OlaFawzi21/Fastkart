import { Component, Input } from '@angular/core';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { RouterModule } from '@angular/router';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { ButtonComponent } from '../../button/button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { Product } from '../../../../interface/product.interface';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { DeleteWishlist } from '../../../../action/wishlist.action';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-classic-product-box',
    imports: [CurrencySymbolPipe, RouterModule, NgbModule, TranslateModule,
        ProductHoverActionComponent, ButtonComponent, ProductCartButtonComponent
    ],
    templateUrl: './classic-product-box.component.html',
    styleUrl: './classic-product-box.component.scss'
})
export class ClassicProductBoxComponent {

  @Input() product: Product;
  @Input() class: string;
  @Input() close: boolean;
  
  constructor(config: NgbRatingConfig, private store: Store) {
		config.max = 5;
		config.readonly = true;
	}

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }
  
}
