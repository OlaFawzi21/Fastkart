import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../shared/interface/core.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { environment } from '../../../../../environments/environment';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-collection-right-sidebar',
    imports: [BannerComponent, CollectionProductsComponent, SidebarComponent],
    templateUrl: './collection-right-sidebar.component.html',
    styleUrl: './collection-right-sidebar.component.scss'
})
export class CollectionRightSidebarComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;
  public storageURL = environment.storageURL;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = this.storageURL + res?.collection?.collection_banner_image_url)
  }

}
