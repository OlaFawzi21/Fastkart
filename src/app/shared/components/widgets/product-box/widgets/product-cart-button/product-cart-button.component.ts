import { Component, inject, Input, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddToCart } from '../../../../../action/cart.action';
import { Cart, CartAddOrUpdate } from '../../../../../interface/cart.interface';
import { Product } from '../../../../../interface/product.interface';
import { CartState } from '../../../../../state/cart.state';
import { ButtonComponent } from '../../../button/button.component';
import { ProductDetailModalComponent } from '../../../modal/product-detail-modal/product-detail-modal.component';
import { VariationModalComponent } from '../../../modal/variation-modal/variation-modal.component';

@Component({
    selector: 'app-product-cart-button',
    imports: [TranslateModule, ButtonComponent, ProductDetailModalComponent,
        VariationModalComponent
    ],
    templateUrl: './product-cart-button.component.html',
    styleUrl: './product-cart-button.component.scss'
})
export class ProductCartButtonComponent {

  @Input() product: Product;
  @Input() text: string;
  @Input() iconClass: string;

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);

  @ViewChild("productDetailModal") productDetailModal: ProductDetailModalComponent;

  public cartItem: Cart | null;
  public currentDate: number | null;
  public saleStartDate: number | null;

  constructor(private store: Store) {}

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

  externalProductLink(link: string) {
    if(link) {
      window.open(link, "_blank");
    }
  }

}
