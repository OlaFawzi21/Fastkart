import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { CompareState } from '../../../shared/state/compare.state';
import { DeleteCompare, GetCompare } from '../../../shared/action/compare.action';
import { Product } from '../../../shared/interface/product.interface';
import { CompareService } from '../../../shared/services/compare.service';
import { CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { AddToCart } from '../../../shared/action/cart.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-compare',
    imports: [CommonModule, TranslateModule, CurrencySymbolPipe,
        TitleCasePipe, NgbModule, BreadcrumbComponent, NoDataComponent
    ],
    templateUrl: './compare.component.html',
    styleUrl: './compare.component.scss'
})
export class CompareComponent {

  public breadcrumb: Breadcrumb = {
    title: "Compare",
    items: [{ label: 'Compare', active: true }]
  }

  public skeletonItems = Array.from({ length: 3 }, (_, index) => index);

  compareItems$: Observable<Product[]> = inject(Store).select(CompareState.compareItems);

  constructor(private store: Store, public compareService: CompareService) {
    this.store.dispatch(new GetCompare());
  }

  moveToCart(product: Product) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: null,
        product_id: product?.id,
        product: product ? product : null,
        variation: null,
        variation_id: null,
        quantity: 1
      }
      this.store.dispatch(new AddToCart(params)).subscribe({
        complete: () => {
          this.removeCompare(product.id);
        }
      });
    }
  }

  removeCompare(id: number) {
    this.store.dispatch(new DeleteCompare(id));
  }

}
