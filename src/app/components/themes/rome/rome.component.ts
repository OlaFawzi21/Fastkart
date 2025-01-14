import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { GetBlogs } from '../../../shared/action/blog.action';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetCategoryProducts, GetProductByIds } from '../../../shared/action/product.action';
import { GetStores } from '../../../shared/action/store.action';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import * as data from '../../../shared/data/owl-carousel';
import { Product } from '../../../shared/interface/product.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { Rome } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { ProductState } from '../../../shared/state/product.state';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { BannerComponent } from '../widgets/banner/banner.component';
import { BlogComponent } from '../widgets/blog/blog.component';
import { BrandComponent } from '../widgets/brand/brand.component';
import { ThemeCategoriesComponent } from '../widgets/categories/categories.component';
import { CategoryProductFilterComponent } from '../widgets/category-product-filter/category-product-filter.component';
import { FourColumnProductComponent } from '../widgets/four-column-product/four-column-product.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { ProductComponent } from '../widgets/product/product.component';
import { TopSellerComponent } from '../widgets/top-seller/top-seller.component';

@Component({
    selector: 'app-rome',
    imports: [CommonModule, HomeBannerComponent, TitleComponent,
        ThemeCategoriesComponent, BannerComponent, CategoryProductFilterComponent,
        TopSellerComponent, ImageLinkComponent, FourColumnProductComponent,
        ProductComponent, BlogComponent, BrandComponent, NewsletterComponent
    ],
    templateUrl: './rome.component.html',
    styleUrl: './rome.component.scss'
})
export class RomeComponent {

  @Input() data?: Rome;
  @Input() slug?: string;

  categoryProduct$: Observable<Product[]> = inject(Store).select(ProductState.categoryProducts) as Observable<Product[]>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public categorySlider = data.categorySlider9;
  public productSlider6ItemMargin = data.productSlider6ItemMargin;
  public customOptionsItem4 = data.customOptionsItem4;
  public productFilterIds: number[] = [];
  public selectedCategoryId: number;
  public showProductBox: number = 6;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) {}

  ngOnInit() {
    if(this.data?.slug == this.slug) {
      // Get Products
      const getProducts$ = this.store.dispatch(new GetProductByIds({
        status: 1,
        paginate: this.data?.content?.products_ids.length,
        ids: this.data?.content?.products_ids?.join(',')
      }));
      const getBrand$ = this.store.dispatch(new GetBrands({
        status: 1,
        ids: this.data?.content?.brands?.brand_ids?.join()
      }));
      const getStore$ = this.store.dispatch(new GetStores({
        status: 1,
        ids: this.data?.content?.seller?.store_ids?.join()
      }));
      const getBlogs$ = this.store.dispatch(new GetBlogs({
        status: 1,
        ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
      }));

      const getCatProducts$ = this.store.dispatch(new GetCategoryProducts({
         category_ids: this.data?.content?.categories_products?.category_ids?.join(',')
      }));

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBlogs$, getCatProducts$, getBrand$, getStore$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });

      if(this.data?.content?.categories_products && this.data?.content?.categories_products?.category_ids?.length) {
        this.selectCategory(this.data?.content?.categories_products?.category_ids[0])
      }
    }

    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.data['data'].theme_option.productBox === 'digital'){
        if (this.productSlider6ItemMargin && this.productSlider6ItemMargin.responsive && this.productSlider6ItemMargin.responsive['1180']) {
          this.productSlider6ItemMargin = {...this.productSlider6ItemMargin, items: 4, responsive :{
            ...this.productSlider6ItemMargin.responsive,
            1180: {
              items: 4
            }
          }}
          this.showProductBox = 4;
        }
      } else {
        if (this.productSlider6ItemMargin && this.productSlider6ItemMargin.responsive && this.productSlider6ItemMargin.responsive['1180']) {
          this.productSlider6ItemMargin = {...this.productSlider6ItemMargin, items: 6, responsive :{
            ...this.productSlider6ItemMargin.responsive,
            1180: {
              items: 6
            }
          }}
          this.showProductBox = 6;
        }
      }
    })

  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    this.categoryProduct$.subscribe(products => {
      this.productFilterIds = products.filter(product => product?.categories?.map(category => category.id).includes(id))
          ?.map(product => product.id).slice(0, 5);
    });
  }

}
