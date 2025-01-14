import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart } from '../../../interface/cart.interface';
import { CartState } from '../../../state/cart.state';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../pipe/currency-symbol.pipe';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-sticky-cart',
    imports: [CommonModule, TranslateModule, RouterModule,
        CurrencySymbolPipe, ButtonComponent
    ],
    templateUrl: './sticky-cart.component.html',
    styleUrl: './sticky-cart.component.scss'
})
export class StickyCartComponent {

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);
  cartTotal$: Observable<number> = inject(Store).select(CartState.cartTotal);
  stickyCart$: Observable<boolean> = inject(Store).select(CartState.stickyCart);

  public isOpen: boolean;

  constructor() {
    this.stickyCart$.subscribe(value => this.isOpen = value);
  }

  openCart(isOpen: boolean) {
    this.isOpen = isOpen;
  }

}
