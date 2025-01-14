import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CarouselModule } from 'ngx-owl-carousel-o';
import * as data from '../../../../../shared/data/owl-carousel';
import { Product } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { ProductSidebarComponent } from '../sidebar/sidebar.component';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { ProductActionComponent } from '../widgets/product-action/product-action.component';
import { ProductBundleComponent } from '../widgets/product-bundle/product-bundle.component';
import { ProductContainComponent } from '../widgets/product-contain/product-contain.component';
import { ProductDeliveryInformationComponent } from '../widgets/product-delivery-information/product-delivery-information.component';
import { ProductDetailsAccordionComponent } from '../widgets/product-details-accordion/product-details-accordion.component';
import { ProductInformationComponent } from '../widgets/product-information/product-information.component';
import { ProductSocialShareComponent } from '../widgets/product-social-share/product-social-share.component';

@Component({
    selector: 'app-product-accordion',
    imports: [TranslateModule, CarouselModule, NgxImageZoomModule,
        ProductContainComponent, ProductActionComponent, ProductInformationComponent,
        ProductDeliveryInformationComponent, PaymentOptionComponent, ProductSocialShareComponent,
        ProductBundleComponent, ProductDetailsAccordionComponent, ProductSidebarComponent],
    templateUrl: './product-accordion.component.html',
    styleUrl: './product-accordion.component.scss'
})
export class ProductAccordionComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  public activeSlide: string = '0';
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  
  public productMainThumbSlider = data.productMainThumbSlider;
  public productThumbSlider = data.productThumbSlider;

}
