import { Component, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-collection-offcanvas-filter',
    imports: [SidebarComponent, CollectionProductsComponent],
    templateUrl: './collection-offcanvas-filter.component.html',
    styleUrl: './collection-offcanvas-filter.component.scss'
})
export class CollectionOffcanvasFilterComponent {

  @Input() filter: Params;

  constructor(public attributeService: AttributeService) {
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }

}
