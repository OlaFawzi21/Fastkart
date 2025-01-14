import { Component, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import * as data from  '../../../../shared/data/owl-carousel';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionCategoriesComponent } from '../widgets/collection-categories/collection-categories.component';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-collection-category-slider',
    imports: [CollectionCategoriesComponent, SidebarComponent, CollectionProductsComponent],
    templateUrl: './collection-category-slider.component.html',
    styleUrl: './collection-category-slider.component.scss'
})
export class CollectionCategorySliderComponent {

  @Input() filter: Params;

  public categorySlider = data.categorySlider;

  constructor(public attributeService: AttributeService) {}

}
