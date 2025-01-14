import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../../../shared/interface/product.interface';
import { SliderProductsTokyo } from '../../../../shared/interface/theme.interface';
import { ProductState } from '../../../../shared/state/product.state';
import { ProductComponent } from '../product/product.component';

@Component({
    selector: 'app-four-column-product',
    imports: [ProductComponent],
    templateUrl: './four-column-product.component.html',
    styleUrl: './four-column-product.component.scss'
})
export class FourColumnProductComponent {

  @Input() data?: SliderProductsTokyo;
  @Input() col: string;

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  getProducts(ids: number[]) {
    if (Array.isArray(ids)) {
      let filteredProducts: Product[] = [];
      this.product$.subscribe(products => {
        filteredProducts = products.data.filter(product => ids?.includes(product?.id!));
      });
      return filteredProducts;
    } return
  }

}
