import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetProductByIds } from '../../../shared/action/product.action';
import { GetStores } from '../../../shared/action/store.action';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import * as data from '../../../shared/data/owl-carousel';
import { Option } from '../../../shared/interface/theme-option.interface';
import { Tokyo } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { ThemeState } from '../../../shared/state/theme.state';
import { BannerComponent } from '../widgets/banner/banner.component';
import { BrandComponent } from '../widgets/brand/brand.component';
import { ThemeCategoriesComponent } from '../widgets/categories/categories.component';
import { FourColumnProductComponent } from '../widgets/four-column-product/four-column-product.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { ProductComponent } from '../widgets/product/product.component';
import { TopSellerComponent } from '../widgets/top-seller/top-seller.component';

@Component({
    selector: 'app-tokyo',
    imports: [HomeBannerComponent, ThemeCategoriesComponent, BannerComponent,
        TitleComponent, ProductComponent, TopSellerComponent,
        ImageLinkComponent, FourColumnProductComponent, BrandComponent, NewsletterComponent
    ],
    templateUrl: './tokyo.component.html',
    styleUrl: './tokyo.component.scss'
})
export class TokyoComponent {

  @Input() data?: Tokyo;
  @Input() slug?: string;

  public productSlider = data.productSlider2;
  public categorySlider = data.categorySlider9;
  public storageURL = environment.storageURL;

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  activeTheme$: Observable<string> = inject(Store).select(ThemeState.activeTheme);

  constructor(private store: Store,
    private themeOptionService: ThemeOptionService,
    private route: ActivatedRoute) {}

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
        ids: this.data?.content?.main_content?.seller?.store_ids?.join()
      }));
      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBrand$, getStore$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;
        }
      });
    }

    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.data['data'].theme_option.productBox === 'digital'){
        if (this.productSlider && this.productSlider.responsive && this.productSlider.responsive['990']) {
          this.productSlider = {...this.productSlider, items: 3, responsive :{
            ...this.productSlider.responsive,
            990: {
              items: 3
            }
          }}
        }
      } else {
        if (this.productSlider && this.productSlider.responsive && this.productSlider.responsive['990']) {
          this.productSlider = {...this.productSlider, items: 5, responsive :{
            ...this.productSlider.responsive,
            990: {
              items: 5
            }
          }}
        }
      }
    })

  }

  ngAfterViewChecked() {
    // Add Topbar Dark Class
    document.querySelector('.header-top')?.classList.add('bg-dark');
  }

  ngOnDestroy() {
    // Remove Topbar Dark Class for this theme only
    document.querySelector('.header-top')?.classList.remove('bg-dark');
  }

}
