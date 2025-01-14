import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddToCart } from '../../../../../../shared/action/cart.action';
import { AddToCompare } from '../../../../../../shared/action/compare.action';
import { AddToWishlist, DeleteWishlist } from '../../../../../../shared/action/wishlist.action';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { SaleTimerComponent } from '../../../../../../shared/components/widgets/sale-timer/sale-timer.component';
import { VariantAttributesComponent } from '../../../../../../shared/components/widgets/variant-attributes/variant-attributes.component';
import { Cart, CartAddOrUpdate } from '../../../../../../shared/interface/cart.interface';
import { Product, Variation } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency-symbol.pipe';
import { CartState } from '../../../../../../shared/state/cart.state';
import { WishlistState } from '../../../../../../shared/state/wishlist.state';
import { ProductWholesaleComponent } from '../product-wholesale/product-wholesale.component';

@Component({
    selector: 'app-product-contain',
    imports: [CommonModule, TranslateModule, RouterModule, NgbModule,
        CurrencySymbolPipe, VariantAttributesComponent, SaleTimerComponent,
        ButtonComponent, ProductWholesaleComponent
    ],
    templateUrl: './product-contain.component.html',
    styleUrl: './product-contain.component.scss'
})
export class ProductContainComponent {

  @Input() product: Product;
  @Input() option: Option | null;
  @Input() owlCar: any;

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);
  wishlistIds$: Observable<number[]> = inject(Store).select(WishlistState.wishlistIds);

  public cartItem: Cart | null;
  public productQty: number = 1;
  public selectedVariation: Variation | null;
  public totalPrice: number = 0;

  public ordersCount: number = 10;
  public viewsCount: number = 30;
  public countsInterval: any;

  constructor(private store: Store,
    private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['product'] && changes['product'].currentValue) {
      this.selectedVariation = null;
      clearInterval(this.countsInterval);
      this.product = changes['product']?.currentValue;
    }

    this.countsInterval = setInterval(() => {
      let encourage_max_view_count = this.option?.product?.encourage_max_view_count ? this.option?.product?.encourage_max_view_count : 100;
        this.viewsCount = Math.floor(Math.random() * encourage_max_view_count) + 1;
    }, 5000);

    this.countsInterval = setInterval(() => {
      let encourage_max_order_count = this.option?.product?.encourage_max_order_count ? this.option?.product?.encourage_max_order_count : 100;
      this.ordersCount = Math.floor(Math.random() * encourage_max_order_count) + 1;
    }, 60000);

   this.cartItem$.subscribe(items => {
      this.cartItem = items.find((item) => {
        if(item.variation_id){
          this.product.variations.find((i) => {
            return i.id ==  item.variation_id;
          })
        }else{
          return item?.product?.id == this.product.id;
        }
      })!
    });

  }

  ngOnInit(){
    this.wholesalePriceCal();
  }

  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
    this.wholesalePriceCal();
  }

  openDocument(url: string): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('Document URL is not available');
    }
  }

  addToCart(product: Product, buyNow?: boolean) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: this.cartItem && (this.selectedVariation && this.cartItem?.variation &&
          this.selectedVariation?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
        product_id: product?.id,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id ? this.selectedVariation?.id : null,
        quantity: this.productQty
      }
      this.store.dispatch(new AddToCart(params)).subscribe({
        complete: () => {
          if(buyNow) {
            this.router.navigate(['/checkout']);
          }
        }
      });
    }
  }

  addToWishlist(product: Product){
    product['is_wishlist'] = !product['is_wishlist'];
    let action = product['is_wishlist']? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }

  addToCompare(id: number) {
    this.store.dispatch(new AddToCompare({ product_id: id }));
  }

  externalProductLink(link: string) {
    if(link) {
      window.open(link, "_blank");
    }
  }

  wholesalePriceCal() {
    let wholesale = this.product?.wholesales.find(value => value.min_qty <= this.productQty && value.max_qty >= this.productQty) || null;
    if(wholesale && this.product?.wholesale_price_type == 'fixed') {
      this.totalPrice = this.productQty * wholesale.value;
    } else if(wholesale && this.product?.wholesale_price_type == 'percentage') {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product?.sale_price);
      this.totalPrice = this.totalPrice - (this.totalPrice * (wholesale.value / 100));
    } else {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product?.sale_price);
    }
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.countsInterval) {
      clearInterval(this.countsInterval);
    }
  }

}
