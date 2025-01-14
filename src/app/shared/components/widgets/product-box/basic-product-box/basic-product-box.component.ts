import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddToCart } from '../../../../../shared/action/cart.action';
import { AddToCompare } from '../../../../../shared/action/compare.action';
import { AddToWishlist, DeleteWishlist } from '../../../../../shared/action/wishlist.action';
import { Cart, CartAddOrUpdate } from '../../../../../shared/interface/cart.interface';
import { Product } from '../../../../../shared/interface/product.interface';
import { CartState } from '../../../../../shared/state/cart.state';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../../pipe/title-case.pipe';
import { ProductDetailModalComponent } from '../../../widgets/modal/product-detail-modal/product-detail-modal.component';
import { ButtonComponent } from '../../button/button.component';
import { VariationModalComponent } from '../../modal/variation-modal/variation-modal.component';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';

@Component({
    selector: 'app-basic-product-box',
    imports: [CommonModule, RouterModule, NgbModule, TranslateModule,
        CurrencySymbolPipe, TitleCasePipe, ButtonComponent,
        ProductHoverActionComponent, ProductCartButtonComponent, ProductDetailModalComponent,
        VariationModalComponent
    ],
    templateUrl: './basic-product-box.component.html',
    styleUrl: './basic-product-box.component.scss'
})
export class BasicProductBoxComponent {

  @Input() product: Product;
  @Input() class: string;
  @Input() close: boolean;

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems) as Observable<Cart[]>;

  @ViewChild("productDetailModal") productDetailModal: ProductDetailModalComponent;
  @ViewChild("variationModal") VariationModal: VariationModalComponent;

  public cartItem: Cart | null;
  public currentDate: number | null;
  public saleStartDate: number | null;

  constructor(private store: Store,
    config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  ngOnInit() {
    this.cartItem$.subscribe(items => {
      this.cartItem = items?.find(item => item?.product?.id == this.product.id)!;
    });
  }

  addToCart(product: Product, qty: number) {
    const params: CartAddOrUpdate = {
      id: this.cartItem ? this.cartItem.id : null,
      product: product,
      product_id: product?.id,
      variation_id: this.cartItem ? this.cartItem?.variation_id : null,
      variation: this.cartItem ? this.cartItem?.variation : null,
      quantity: qty
    }
    this.store.dispatch(new AddToCart(params));
  }

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

  addToCompar(id: number){
    this.store.dispatch(new AddToCompare({ product_id: id }));
  }

  externalProductLink(link: string) {
    if(link) {
      window.open(link, "_blank");
    }
  }


}
