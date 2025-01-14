import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../interface/product.interface';
import { AddToWishlist, DeleteWishlist } from '../../../../action/wishlist.action';
import { WishlistState } from '../../../../state/wishlist.state';
import { ThemeOptionService } from '../../../../services/theme-option.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../button/button.component';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';

@Component({
    selector: 'app-digital-product-box',
    imports: [TranslateModule, NgbModule, RouterModule,
        CurrencySymbolPipe, ButtonComponent, ProductCartButtonComponent],
    templateUrl: './digital-product-box.component.html',
    styleUrl: './digital-product-box.component.scss'
})
export class DigitalProductBoxComponent {

  @Input() class: string;
  @Input() close: boolean;
  @Input() product: Product;

  wishlistIds$: Observable<number[]> = inject(Store).select(WishlistState.wishlistIds);

  public wishlistIds: number[];

  constructor(private store: Store, public themeOptionService: ThemeOptionService){}

  addToWishlist(product: Product){
    product['is_wishlist'] = !product['is_wishlist'];
    let action = product['is_wishlist']? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }

}
