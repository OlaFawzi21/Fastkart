import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { GetProductByIds } from '../../../shared/action/product.action';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import * as data from '../../../shared/data/owl-carousel';
import { Option } from '../../../shared/interface/theme-option.interface';
import { Moscow } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { BannerComponent } from '../widgets/banner/banner.component';
import { BrandComponent } from '../widgets/brand/brand.component';
import { ThemeCategoriesComponent } from '../widgets/categories/categories.component';
import { FourColumnProductComponent } from '../widgets/four-column-product/four-column-product.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { ProductComponent } from '../widgets/product/product.component';

@Component({
    selector: 'app-moscow',
    imports: [CommonModule, HomeBannerComponent, ThemeCategoriesComponent, TitleComponent,
        ProductComponent, BannerComponent, FourColumnProductComponent,
        ImageLinkComponent, BrandComponent, NewsletterComponent
    ],
    templateUrl: './moscow.component.html',
    styleUrl: './moscow.component.scss'
})
export class MoscowComponent {

  @Input() data?: Moscow;
  @Input() slug?: string;

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public categorySlider = data.categorySlider9;
  public productSlider6Item = data.productSlider6Item;

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

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$]).subscribe({
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
