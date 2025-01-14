import { Component, Input, SimpleChanges } from '@angular/core';
import { Link } from '../../../../../../shared/interface/theme.interface';
import { ImageLinkComponent } from '../../../../../../shared/components/widgets/image-link/image-link.component';

@Component({
    selector: 'app-product-banner',
    imports: [ImageLinkComponent],
    templateUrl: './product-banner.component.html',
    styleUrl: './product-banner.component.scss'
})
export class ProductBannerComponent {

  @Input() image: string | undefined;

  public banner: Link;

  ngOnChanges(change: SimpleChanges){
    if(change['image']) {
      let img = change['image']?.currentValue;
      this.banner = {
        redirect_link: {
          link_type: 'collection',
          link: 'vegetables-fruits'
        },
        image_url: img
      }
    }
  }

}
