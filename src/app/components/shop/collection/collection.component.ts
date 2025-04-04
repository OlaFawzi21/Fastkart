import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../shared/interface/core.interface';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ProductModel } from '../../../shared/interface/product.interface';
import { GetProducts } from '../../../shared/action/product.action';
import { ProductState } from '../../../shared/state/product.state';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { CollectionCategorySliderComponent } from './collection-category-slider/collection-category-slider.component';
import { CollectionCategorySidebarComponent } from './collection-category-sidebar/collection-category-sidebar.component';
import { CollectionBannerComponent } from './collection-banner/collection-banner.component';
import { CollectionLeftSidebarComponent } from './collection-left-sidebar/collection-left-sidebar.component';
import { CollectionRightSidebarComponent } from './collection-right-sidebar/collection-right-sidebar.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionOffcanvasFilterComponent } from './collection-offcanvas-filter/collection-offcanvas-filter.component';
import { CollectionNoSidebarComponent } from './collection-no-sidebar/collection-no-sidebar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-collection",
  imports: [
    BreadcrumbComponent,
    CollectionCategorySliderComponent,
    CollectionCategorySidebarComponent,
    CollectionBannerComponent,
    CollectionLeftSidebarComponent,
    CollectionRightSidebarComponent,
    CollectionListComponent,
    CollectionOffcanvasFilterComponent,
    CollectionNoSidebarComponent,
  ],
  templateUrl: "./collection.component.html",
  styleUrl: "./collection.component.scss",
})
export class CollectionComponent {
  product$: Observable<ProductModel> = inject(Store).select(
    ProductState.product
  );
  themeOptions$: Observable<Option> = inject(Store).select(
    ThemeOptionState.themeOptions
  ) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("collections"),
    items: [{ label: this.translate.instant("collections"), active: false }],
  };
  public layout: string = "collection_category_slider";
  public skeleton: boolean = true;

  public filter: Params = {
    page: 1, // Current page number
    paginate: 40, // Display per page,
    status: 1,
    field: "created_at",
    price: "",
    category: "",
    tag: "",
    sort: "asc", // ASC, DSC
    sortBy: "asc",
    rating: "",
    attribute: "",
  };

  public totalItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private translate: TranslateService
  ) {
    // Get Query params..
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        page: params["page"] ? params["page"] : 1,
        paginate: 40,
        status: 1,
        price: params["price"] ? params["price"] : "",
        brand: params["brand"] ? params["brand"] : "",
        category: params["category"] ? params["category"] : "",
        tag: params["tag"] ? params["tag"] : "",
        field: params["field"] ? params["field"] : this.filter["field"],
        sortBy: params["sortBy"] ? params["sortBy"] : this.filter["sortBy"],
        rating: params["rating"] ? params["rating"] : "",
        attribute: params["attribute"] ? params["attribute"] : "",
      };

      this.store.dispatch(new GetProducts(this.filter));

      // Params For Demo Purpose only
      if (params["layout"]) {
        this.layout = params["layout"];
      } else {
        // Get Collection Layout
        this.themeOptions$.subscribe((option) => {
          this.layout =
            option?.collection && option?.collection?.collection_layout
              ? option?.collection?.collection_layout
              : "collection_category_slider";
        });
      }

      this.filter["layout"] = this.layout;
    });
    this.product$.subscribe((product) => (this.totalItems = product?.total));
  }
}
