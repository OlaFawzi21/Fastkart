import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../../shared/services/product.service';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../shared/state/product.state';
import { Params } from '../../../../../shared/interface/core.interface';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { CollectionSortComponent } from '../collection-sort/collection-sort.component';
import { SkeletonProductBoxComponent } from '../../../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component';
import { ProductBoxComponent } from '../../../../../shared/components/widgets/product-box/product-box.component';
import { NoDataComponent } from '../../../../../shared/components/widgets/no-data/no-data.component';
import { CollectionPaginateComponent } from '../collection-paginate/collection-paginate.component';

@Component({
    selector: 'app-collection-products',
    imports: [CommonModule, CollectionSortComponent, SkeletonProductBoxComponent,
        ProductBoxComponent, NoDataComponent, CollectionPaginateComponent
    ],
    templateUrl: './collection-products.component.html',
    styleUrl: './collection-products.component.scss'
})
export class CollectionProductsComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() filter: Params;
  @Input() gridCol: string;

  public gridClass: string = "row g-sm-4 g-3 row-cols-xl-4 row-cols-md-3 row-cols-2 product-list-section";

  public skeletonItems = Array.from({ length: 40 }, (_, index) => index);

  constructor(public productService: ProductService) {
  }

  setGridClass(gridClass: string) {
    this.gridClass = gridClass;
  }

}
