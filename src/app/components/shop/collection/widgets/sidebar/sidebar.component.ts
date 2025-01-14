import { Component, inject, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AttributeService } from '../../../../../shared/services/attribute.service';
import { Params } from '../../../../../shared/interface/core.interface';
import { AttributeModel } from '../../../../../shared/interface/attribute.interface';
import { AttributeState } from '../../../../../shared/state/attribute.state';
import { GetAttributes } from '../../../../../shared/action/attribute.action';
import { BrandState } from '../../../../../shared/state/brand.state';
import { BrandModel } from '../../../../../shared/interface/brand.interface';
import { GetBrands } from '../../../../../shared/action/brand.action';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionFilterComponent } from '../filter/collection-filter/collection-filter.component';
import { SkeletonCollectionSidebarComponent } from '../skeleton-collection-sidebar/skeleton-collection-sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollectionCategoryFilterComponent } from '../filter/collection-category-filter/collection-category-filter.component';
import { CollectionBrandFilterComponent } from '../filter/collection-brand-filter/collection-brand-filter.component';
import { CollectionAttributesFilterComponent } from '../filter/collection-attributes-filter/collection-attributes-filter.component';
import { CollectionPriceFilterComponent } from '../filter/collection-price-filter/collection-price-filter.component';
import { CollectionRatingFilterComponent } from '../filter/collection-rating-filter/collection-rating-filter.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-collection-sidebar',
    imports: [TranslateModule, NgbModule, CommonModule, CollectionFilterComponent,
        SkeletonCollectionSidebarComponent, CollectionCategoryFilterComponent,
        CollectionBrandFilterComponent, CollectionAttributesFilterComponent, CollectionPriceFilterComponent,
        CollectionRatingFilterComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() filter: Params;
  @Input() hideFilter: string[];

  attribute$: Observable<AttributeModel> = inject(Store).select(AttributeState.attribute);
  brand$: Observable<BrandModel> = inject(Store).select(BrandState.brand);

  constructor(private store: Store,
    public attributeService: AttributeService) {
    this.store.dispatch(new GetAttributes({ status: 1}));
    this.store.dispatch(new GetBrands({status: 1}));
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }

}
