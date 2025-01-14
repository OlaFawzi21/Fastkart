import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductState } from '../../../../shared/state/product.state';
import { Observable } from 'rxjs';
import { Product } from '../../../../shared/interface/product.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../../../shared/components/widgets/title/title.component';
import { ThemeCategoriesComponent } from '../categories/categories.component';
import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';

@Component({
    selector: 'app-category-product-filter',
    imports: [CommonModule, TitleComponent, ThemeCategoriesComponent, ProductBoxComponent],
    templateUrl: './category-product-filter.component.html',
    styleUrl: './category-product-filter.component.scss'
})
export class CategoryProductFilterComponent {

  @Input() data: any;
  @Input() sliderOption: OwlOptions;
  @Input() grid: number = 3;

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  categoryProduct$: Observable<Product[]> = inject(Store).select(ProductState.categoryProducts) as Observable<Product[]>;

  public products: Product[];
  public selectedCategoryId: number;
  public productFilterIds: number[] = [];

  constructor(private store: Store, public themeOptionService: ThemeOptionService){
  }

  ngOnChanges(){
    this.categoryProduct$.subscribe(products => {
      this.products = products.map(product => product).slice(0, this.grid * 2);
    })
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    this.categoryProduct$.subscribe(products => {
      if(id){
        this.products = products.filter(product => product?.categories?.map(category => category.id).includes(id)).map(product => product).slice(0, this.grid * 2);
      } else {
        this.products = products.filter(product => product?.categories?.map(category => category.id)).map(product => product).slice(0, this.grid * 2)
      }
    });
  }

}
