import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel'
import { Bundles } from '../../../../shared/interface/theme.interface';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';

@Component({
    selector: 'app-theme-collection',
    imports: [CarouselModule, ImageLinkComponent],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss'
})
export class CollectionComponent {

  @Input() data: Bundles[];

  public bannerSlider = data.bannerSlider;

}
