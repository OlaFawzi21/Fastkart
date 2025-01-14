import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-collection-category-banner',
    imports: [],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {

  @Input() class?: string = 'banner-contain-2 hover-effect';
  @Input() imageUrl?: string;

}
