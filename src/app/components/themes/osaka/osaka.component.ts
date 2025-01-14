import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { GetBlogs } from '../../../shared/action/blog.action';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetProductByIds } from '../../../shared/action/product.action';
import { GetStores } from '../../../shared/action/store.action';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import * as data from '../../../shared/data/owl-carousel';
import { Option } from '../../../shared/interface/theme-option.interface';
import { Osaka } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { BannerComponent } from '../widgets/banner/banner.component';
import { BlogComponent } from '../widgets/blog/blog.component';
import { BrandComponent } from '../widgets/brand/brand.component';
import { ThemeCategoriesComponent } from '../widgets/categories/categories.component';
import { CollectionComponent } from '../widgets/collection/collection.component';
import { FourColumnProductComponent } from '../widgets/four-column-product/four-column-product.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { ProductComponent } from '../widgets/product/product.component';
import { TopSellerComponent } from '../widgets/top-seller/top-seller.component';

@Component({
    selector: 'app-osaka',
    imports: [HomeBannerComponent, TitleComponent, ThemeCategoriesComponent,
        BannerComponent, ProductComponent, TopSellerComponent,
        CollectionComponent, FourColumnProductComponent, BlogComponent,
        BrandComponent, NewsletterComponent
    ],
    templateUrl: './osaka.component.html',
    styleUrl: './osaka.component.scss'
})
export class OsakaComponent {

  @Input() data?: Osaka;
  @Input() slug?: string;

  public categorySlider = data.categorySlider9;
  public productSlider6Item = data.productSlider6Item;
  public productSlider = data.bannerSlider;

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) {}

  ngOnInit() {
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
        status: 1,
        ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
      }));

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBrand$, getStore$, getBlogs$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.data['data'].theme_option.productBox === 'digital'){
        if (this.productSlider6Item && this.productSlider6Item.responsive && this.productSlider6Item.responsive['1065']) {
          this.productSlider6Item = {...this.productSlider6Item, items: 4, responsive :{
            ...this.productSlider6Item.responsive,
            1065: {
              items: 4
            }
          }}
        }
      } else {
        if (this.productSlider6Item && this.productSlider6Item.responsive && this.productSlider6Item.responsive['1065']) {
          this.productSlider6Item = {...this.productSlider6Item, items: 6, responsive :{
            ...this.productSlider6Item.responsive,
            1065: {
              items: 6
            }
          }}
        }
      }
    })

  }

}
