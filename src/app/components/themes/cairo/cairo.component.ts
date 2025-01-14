import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GetBlogs } from '../../../shared/action/blog.action';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetCategoryProducts, GetProductByIds } from '../../../shared/action/product.action';
import { GetStores } from '../../../shared/action/store.action';
import { SearchComponent } from '../../../shared/components/header/widgets/search/search.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import * as data from '../../../shared/data/owl-carousel';
import { Category } from '../../../shared/interface/category.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { BlogComponent } from '../widgets/blog/blog.component';
import { BrandComponent } from '../widgets/brand/brand.component';
import { ThemeCategoriesComponent } from '../widgets/categories/categories.component';
import { CategoryProductFilterComponent } from '../widgets/category-product-filter/category-product-filter.component';
import { ProductComponent } from '../widgets/product/product.component';
import { TopSellerComponent } from '../widgets/top-seller/top-seller.component';

@Component({
    selector: 'app-cairo',
    imports: [CommonModule, TranslateModule, SearchComponent,
        ThemeCategoriesComponent, TitleComponent, ProductComponent,
        TopSellerComponent, CategoryProductFilterComponent, BlogComponent,
        BrandComponent
    ],
    templateUrl: './cairo.component.html',
    styleUrl: './cairo.component.scss'
})
export class CairoComponent {

  @Input() data?: any;
  @Input() slug?: string;

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);
  public storageURL = environment.storageURL;

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public categorySlider = data.categorySlider9;
  public productSlider = data.customOptionsItem3;
  public bannerSlider = data.bannerSlider;

  public showProductBox = 6;
  public productFilterIds: number[] = [];
  public categories: Category[] = []
  public path: string;

  constructor(private store: Store,
    private themeOptionService: ThemeOptionService,
    private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.themeOptionService.isDigitalProductBox = true;
    if(this.data?.slug == this.slug) {
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
        status: 1
      }));
      const getCategoryProduct$ = this.store.dispatch(new GetCategoryProducts(
        { category_ids: this.data.content?.categories_products?.category_ids?.join(',')
      }));

      // Skeleton Loader
        document.body.classList.add('skeleton-body');
        document.body.classList.add('cairo');

      forkJoin([getProducts$, getBrand$, getStore$, getBlogs$, getCategoryProduct$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.data['data'].theme_option.productBox === 'digital'){
        if (this.productSlider && this.productSlider.responsive && this.productSlider.responsive['1050']) {
          this.productSlider = {...this.productSlider, items: 3, responsive :{
            ...this.productSlider.responsive,
            1050: {
              items: 3
            }
          }}
          this.showProductBox = 4;
        }
      } else {
        if (this.productSlider && this.productSlider.responsive && this.productSlider.responsive['1050']) {
          this.productSlider = {...this.productSlider, items: 4, responsive :{
            ...this.productSlider.responsive,
            1050: {
              items: 4
            }
          }}
          this.showProductBox = 6;
        }
      }
    });

  }

  ngOnDestroy(){
    document.body.classList.remove('cairo');
  }

}
