import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BreadcrumbDigitalComponent } from '../../../shared/components/widgets/breadcrumb-digital/breadcrumb-digital.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Product } from '../../../shared/interface/product.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ProductState } from '../../../shared/state/product.state';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { ProductAccordionComponent } from './product-details/product-accordion/product-accordion.component';
import { ProductDigitalComponent } from './product-details/product-digital/product-digital.component';
import { ProductImagesComponent } from './product-details/product-images/product-images.component';
import { ProductSliderComponent } from './product-details/product-slider/product-slider.component';
import { ProductStickyComponent } from './product-details/product-sticky/product-sticky.component';
import { ProductThumbnailComponent } from './product-details/product-thumbnail/product-thumbnail.component';
import { RelatedProductsComponent } from './product-details/widgets/related-products/related-products.component';
import { StickyCheckoutComponent } from './product-details/widgets/sticky-checkout/sticky-checkout.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-product",
  imports: [
    CommonModule,
    BreadcrumbComponent,
    BreadcrumbDigitalComponent,
    ProductThumbnailComponent,
    RelatedProductsComponent,
    StickyCheckoutComponent,
    ProductImagesComponent,
    ProductSliderComponent,
    ProductStickyComponent,
    ProductAccordionComponent,
    ProductDigitalComponent,
  ],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent {
  product$: Observable<Product> = inject(Store).select(
    ProductState.selectedProduct
  ) as Observable<Product>;
  themeOptions$: Observable<Option> = inject(Store).select(
    ThemeOptionState.themeOptions
  ) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("product"),
    items: [],
  };
  public layout: string = "product_digital";
  public product: Product;
  public isScrollActive = false;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.product$.subscribe((product) => {
      this.breadcrumb.items = [];
      this.breadcrumb.title = product.name;
      this.breadcrumb.items.push(
        { label: this.translate.instant("product"), active: true },
        { label: product.name, active: false }
      );
    });

    // For Demo Purpose only
    this.route.queryParams.subscribe((params) => {
      if (params["layout"]) {
        this.layout = params["layout"];
      } else {
        // Get Product Layout
        this.themeOptions$.subscribe((option) => {
          this.layout =
            option?.product && option?.product?.product_layout
              ? option?.product?.product_layout
              : "product_thumbnail";
        });
      }
    });
  }

  @HostListener("window:scroll", ["$event"])
  onScroll() {
    const button = document.querySelector(".scroll-button");
    if (button) {
      const buttonRect = button.getBoundingClientRect();
      if (buttonRect.bottom < window.innerHeight && buttonRect.bottom < 0) {
        this.isScrollActive = true;
        document.body.classList.add("stickyCart");
      } else {
        this.isScrollActive = false;
        document.body.classList.remove("stickyCart");
      }
    }
  }

  ngOnDestroy() {
    document.body.classList.remove("stickyCart");
  }
}
