import { Component, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import * as data from  '../../../../shared/data/owl-carousel';
import { CollectionCategoriesComponent } from '../widgets/collection-categories/collection-categories.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-collection-category-sidebar',
    imports: [CollectionCategoriesComponent, CollectionProductsComponent],
    templateUrl: './collection-category-sidebar.component.html',
    styleUrl: './collection-category-sidebar.component.scss'
})
export class CollectionCategorySidebarComponent {

  @Input() filter: Params;

  public categorySlider = data.categorySlider;

  constructor(public attributeService: AttributeService) {}
}
