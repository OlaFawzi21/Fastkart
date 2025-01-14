import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';

@Component({
    selector: 'app-theme-banner',
    imports: [CarouselModule, ImageLinkComponent],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {

  @Input() style: string = 'horizontal';
  @Input() class: string | null;
  @Input() contentClass: string;
  @Input() banners: any;

  public bannerSlider = data.bannerSlider;

}
