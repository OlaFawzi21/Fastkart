import { Component, inject, Input } from '@angular/core';
import { Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { environment } from '../../../../../environments/environment';
import { BannerComponent } from '../widgets/banner/banner.component';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-collection-list',
    imports: [BannerComponent, SidebarComponent, CollectionProductsComponent],
    templateUrl: './collection-list.component.html',
    styleUrl: './collection-list.component.scss'
})
export class CollectionListComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;
  public storageURL = environment.storageURL;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = this.storageURL + res?.collection?.collection_banner_image_url);
  }
}
