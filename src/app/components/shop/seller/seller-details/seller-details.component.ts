import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../shared/interface/core.interface';
import { Breadcrumb } from '../../../../shared/interface/breadcrumb';
import { ProductModel } from '../../../../shared/interface/product.interface';
import { Stores } from '../../../../shared/interface/store.interface';
import { StoreState } from '../../../../shared/state/store.state';
import { GetProducts } from '../../../../shared/action/product.action';
import { ProductState } from '../../../../shared/state/product.state';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { SellerDetailsBasicComponent } from './seller-details-basic/seller-details-basic.component';
import { SellerDetailsClassicComponent } from './seller-details-classic/seller-details-classic.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-seller-details",
  imports: [
    CommonModule,
    BreadcrumbComponent,
    SellerDetailsBasicComponent,
    SellerDetailsClassicComponent,
  ],
  templateUrl: "./seller-details.component.html",
  styleUrl: "./seller-details.component.scss",
})
export class SellerDetailsComponent {
  product$: Observable<ProductModel> = inject(Store).select(
    ProductState.product
  );
  themeOptions$: Observable<Option> = inject(Store).select(
    ThemeOptionState.themeOptions
  ) as Observable<Option>;
  store$: Observable<Stores> = inject(Store).select(
    StoreState.selectedStore
  ) as Observable<Stores>;

  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("seller"),
    items: [],
  };
  public layout: string = "basic_store_details";
  public skeleton: boolean = true;

  public filter: Params = {
    page: 1, // Current page number
    paginate: 40, // Display per page,
    status: 1,
    field: "price",
    price: "",
    category: "",
    tag: "",
    sort: "", // ASC, DSC
    sortBy: "",
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
        field: params["field"] ? params["field"] : "",
        price: params["price"] ? params["price"] : "",
        category: params["category"] ? params["category"] : "",
        tag: params["tag"] ? params["tag"] : "",
        sort: params["sort"] ? params["sort"] : "",
        sortBy: params["sortBy"] ? params["sortBy"] : "",
        rating: params["rating"] ? params["rating"] : "",
        attribute: params["attribute"] ? params["attribute"] : "",
      };

      this.route.params.subscribe(
        (param) => (this.filter["store_slug"] = param["slug"])
      );

      this.breadcrumb.items = [];
      this.breadcrumb.title = this.filter["store_slug"]
        ? this.filter["store_slug"]
        : this.translate.instant("seller");
      this.breadcrumb.items.push(
        { label: this.translate.instant("seller-store"), active: true },
        { label: this.breadcrumb.title, active: false }
      );

      this.store.dispatch(new GetProducts(this.filter));

      // Params For Demo Purpose only
      if (params["layout"]) {
        this.layout = params["layout"];
      } else {
        // Get Layout
        this.themeOptions$.subscribe((option) => {
          this.layout = "basic_store_details";
        });
      }

      this.filter["layout"] = this.layout;
    });

    this.product$.subscribe((product) => (this.totalItems = product?.total));
  }
}
