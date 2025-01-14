import { Component, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import * as data from '../../../../../shared/data/owl-carousel';
import { AddToCart } from '../../../../action/cart.action';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import { Product, Variation } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../../pipe/title-case.pipe';
import { CartState } from '../../../../state/cart.state';
import { ButtonComponent } from '../../button/button.component';
import { VariantAttributesComponent } from '../../variant-attributes/variant-attributes.component';

@Component({
    selector: 'app-product-detail-modal',
    imports: [TranslateModule, CarouselModule, NgbModule,
        CurrencySymbolPipe, TitleCasePipe, ButtonComponent,
        VariantAttributesComponent],
    templateUrl: './product-detail-modal.component.html',
    styleUrl: './product-detail-modal.component.scss'
})
export class ProductDetailModalComponent {

  @ViewChild("productDetailModal", { static: false }) productDetailModal: TemplateRef<any>;

  @Input() product: Product;
  @Input() owlCar: any; // Define owlCar as an input property

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems) as Observable<Cart[]>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  public cartItem: Cart | null;
  public productQty: number = 1;
  public selectedVariation: Variation | null;

  public activeSlide: string = '0';
  public totalPrice: number = 0;

  public productMainThumbSlider = data.productMainThumbSlider;
  public productThumbSlider = data.productThumbSlider;

  constructor(private modalService: NgbModal,
    private store: Store) {
  }

  ngOnInit() {
    this.cartItem$.subscribe(items => {
      this.cartItem = items?.find(item => item?.product?.id == this.product.id)!;
    });
  }

  async openModal() {
    this.modalOpen = true;
    this.wholesalePriceCal();
    this.modalService.open(this.productDetailModal, {
      ariaLabelledBy: 'Product-Detail-Modal',
      centered: true,
      windowClass: 'theme-modal view-modal modal-lg'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
    this.wholesalePriceCal();
  }

  wholesalePriceCal() {
    let wholesale = this.product.wholesales.find(value => value.min_qty <= this.productQty && value.max_qty >= this.productQty) || null;
    if(wholesale && this.product.wholesale_price_type == 'fixed') {
      this.totalPrice = this.productQty * wholesale.value;
    } else if(wholesale && this.product.wholesale_price_type == 'percentage') {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product.sale_price);
      this.totalPrice = this.totalPrice - (this.totalPrice * (wholesale.value / 100));
    } else {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product.sale_price);
    }
  }

  addToCart(product: Product) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: this.cartItem && (this.selectedVariation && this.cartItem?.variation &&
          this.selectedVariation?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
        product_id: product?.id!,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id ? this.selectedVariation?.id! : null,
        quantity: this.productQty
      }
      this.store.dispatch(new AddToCart(params)).subscribe({
        complete: () => {
          this.modalService.dismissAll();
        }
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  externalProductLink(link: string) {
    if(link) {
      window.open(link, "_blank");
    }
  }

}
