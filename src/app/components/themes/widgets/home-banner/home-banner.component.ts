import { Component, Input } from '@angular/core';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';

@Component({
    selector: 'app-theme-home-banner',
    imports: [ImageLinkComponent],
    templateUrl: './home-banner.component.html',
    styleUrl: './home-banner.component.scss'
})
export class HomeBannerComponent {

  @Input() theme: string = 'paris';
  @Input() data: any;
  
}
