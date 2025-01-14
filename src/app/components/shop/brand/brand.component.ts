import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { GetProducts } from '../../../shared/action/product.action';
import { GetBrands } from '../../../shared/action/brand.action';
import { Observable, switchMap } from 'rxjs';
import { ProductModel } from '../../../shared/interface/product.interface';
import { ProductState } from '../../../shared/state/product.state';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Params } from '../../../shared/interface/core.interface';
import { BrandState } from '../../../shared/state/brand.state';
import { Brand } from '../../../shared/interface/brand.interface';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { CollectionProductsComponent } from '../collection/widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-brand',
    imports: [BreadcrumbComponent, CollectionProductsComponent],
    templateUrl: './brand.component.html',
    styleUrl: './brand.component.scss'
})
export class BrandComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);
  brand$: Observable<Brand> = inject(Store).select(BrandState.selectedBrand) as Observable<Brand>;

  public breadcrumb: Breadcrumb = {
    title: "Brand",
    items: [{ label: 'Collections', active: false }]
  };
  public layout: string = 'collection_category_slider';
  public skeleton: boolean = true;
  public brand: Brand;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 40, // Display per page,
    'brand': ''
  };

  public totalItems: number = 0;

  constructor(private route: ActivatedRoute,
    private store: Store) {
      this.brand$.subscribe(brand => this.brand = brand)
      this.breadcrumb.title = `Brand: ${this.brand?.name}`
      this.breadcrumb.items[0].label = this.brand?.name
      this.filter['brand'] = this.route.snapshot.paramMap.get('slug')
      this.store.dispatch(new GetProducts(this.filter));
  }

}
