import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';
import { Product } from '../../../../shared/interface/product.interface';
import { ProductState } from '../../../../shared/state/product.state';
import * as data from '../../../../shared/data/owl-carousel';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { SkeletonProductBoxComponent } from '../../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component';

@Component({
    selector: 'app-theme-product',
    imports: [CommonModule, CarouselModule, SkeletonProductBoxComponent,
        ProductBoxComponent, NoDataComponent],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() style: string = 'vertical';
  @Input() productIds: number[] = [];
  @Input() boxClass: string;
  @Input() productStyle: string='';
  @Input() layout: string;
  @Input() sliderOption: OwlOptions = data.productSlider;
  @Input() slider: boolean;
  @Input() showItem: number;

  public products: Product[] = [];

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  product$: Observable<Product[]> = inject(Store).select(ProductState.productByIds);
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  constructor(public productService: ProductService) {
  }

  ngOnChanges() {
    if (Array.isArray(this.productIds) && this.productIds.length) {
      this.product$.subscribe(products => {
        this.products = products.filter(product => this.productIds?.includes(product.id));
      });
    }
  }

  ngOnInit(){
    this.themeOption$.subscribe(option => {
      if(option?.product?.product_box_border || option?.product?.image_bg || option?.product?.product_box_bg) {
        this.sliderOption['margin'] = 15
      }
    })
  }
}
