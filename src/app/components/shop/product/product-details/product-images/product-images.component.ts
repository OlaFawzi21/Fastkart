import { Component, Input, ViewChild } from '@angular/core';
import { Product } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ProductSidebarComponent } from '../sidebar/sidebar.component';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { ProductActionComponent } from '../widgets/product-action/product-action.component';
import { ProductBundleComponent } from '../widgets/product-bundle/product-bundle.component';
import { ProductContainComponent } from '../widgets/product-contain/product-contain.component';
import { ProductDeliveryInformationComponent } from '../widgets/product-delivery-information/product-delivery-information.component';
import { ProductDetailsTabsComponent } from '../widgets/product-details-tabs/product-details-tabs.component';
import { ProductInformationComponent } from '../widgets/product-information/product-information.component';
import { ProductSocialShareComponent } from '../widgets/product-social-share/product-social-share.component';
import { VideoPlayModalComponent } from '../widgets/video-play-modal/video-play-modal.component';

@Component({
    selector: 'app-product-images',
    imports: [TranslateModule,
        ProductContainComponent, ProductActionComponent, ProductInformationComponent,
        ProductDeliveryInformationComponent, PaymentOptionComponent, ProductSocialShareComponent,
        ProductBundleComponent, ProductDetailsTabsComponent, VideoPlayModalComponent],
    templateUrl: './product-images.component.html',
    styleUrl: './product-images.component.scss'
})
export class ProductImagesComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  @ViewChild("videoPlayModal") VideoPlayModal: VideoPlayModalComponent;

  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

}
