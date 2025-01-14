import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../../shared/state/product.state';
import { ThemeOptionState } from '../../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { TitleComponent } from '../../../../../../shared/components/widgets/title/title.component';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-related-products',
    imports: [CommonModule, TitleComponent, ProductBoxComponent],
    templateUrl: './related-products.component.html',
    styleUrl: './related-products.component.scss'
})
export class RelatedProductsComponent {

  relatedProduct$: Observable<Product[]> = inject(Store).select(ProductState.relatedProducts);
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() product: Product | null;

  public relatedProducts: Product[] = [];

  ngOnChanges() {
    if (this.product?.related_products && Array.isArray(this.product?.related_products)) {
      this.relatedProduct$.subscribe(products => {
        this.relatedProducts = products.filter(product => this.product?.related_products?.includes(product?.id));
      });
    }
  }

}
