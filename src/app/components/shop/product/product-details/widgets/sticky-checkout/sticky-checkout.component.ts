import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddToCart } from '../../../../../../shared/action/cart.action';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { VariantAttributesComponent } from '../../../../../../shared/components/widgets/variant-attributes/variant-attributes.component';
import { Cart, CartAddOrUpdate } from '../../../../../../shared/interface/cart.interface';
import { Product, Variation } from '../../../../../../shared/interface/product.interface';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency-symbol.pipe';
import { CartState } from '../../../../../../shared/state/cart.state';

@Component({
    selector: 'app-sticky-checkout',
    imports: [CurrencySymbolPipe, TranslateModule, VariantAttributesComponent,
        ButtonComponent
    ],
    templateUrl: './sticky-checkout.component.html',
    styleUrl: './sticky-checkout.component.scss'
})
export class StickyCheckoutComponent {

  @Input() product: Product;

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);

  public cartItem: Cart | null;
  public productQty: number = 1;
  public selectedVariation: Variation | null;

  constructor(private store: Store) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['product'] && changes['product'].currentValue) {
      this.product = changes['product']?.currentValue;
    }
    this.cartItem$.subscribe(items => {
      this.cartItem = items?.find(item => item?.product?.id == this.product.id)!;
    });
  }

  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
  }

  addToCart(product: Product) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: this.cartItem && (this.selectedVariation && this.cartItem?.variation &&
          this.selectedVariation?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
        product_id: product?.id!,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id ? this.selectedVariation?.id : null,
        quantity: this.productQty
      }
      this.store.dispatch(new AddToCart(params));
    }
  }

  externalProductLink(link: string) {
    if(link) {
      window.open(link, "_blank");
    }
  }

}
