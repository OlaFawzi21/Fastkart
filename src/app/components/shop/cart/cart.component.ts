import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { CartState } from '../../../shared/state/cart.state';
import { UpdateCart, DeleteCart } from '../../../shared/action/cart.action';
import { AddToWishlist } from '../../../shared/action/wishlist.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-cart',
    imports: [CommonModule, TranslateModule, RouterModule,
        CurrencySymbolPipe, BreadcrumbComponent, ButtonComponent, NoDataComponent
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);
  cartTotal$: Observable<number> = inject(Store).select(CartState.cartTotal);
  cartDigital$: Observable<boolean | number> = inject(Store).select(CartState.cartHasDigital) as Observable<boolean | number>;

  public breadcrumb: Breadcrumb = {
    title: "Cart",
    items: [{ label: 'Cart', active: true }]
  }

  constructor(private store: Store) {}

  updateQuantity(item: Cart, qty: number) {
    const params: CartAddOrUpdate = {
      id: item?.id,
      product: item?.product,
      product_id: item?.product?.id,
      variation: item?.variation,
      variation_id: item?.variation_id ? item?.variation_id : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  addToWishlist(item: Cart) {
    this.store.dispatch(new AddToWishlist({ product_id: item.product.id })).subscribe({
      complete: () => {
        this.delete(item.id);
      }
    });
  }

  delete(id: number) {
    this.store.dispatch(new DeleteCart(id));
  }

}
