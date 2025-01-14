import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { Params } from '../../../../../shared/interface/core.interface';
import { ProductState } from '../../../../../shared/state/product.state';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/components/widgets/pagination/pagination.component';

@Component({
    selector: 'app-collection-paginate',
    imports: [CommonModule, PaginationComponent],
    templateUrl: './collection-paginate.component.html',
    styleUrl: './collection-paginate.component.scss'
})
export class CollectionPaginateComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  @Input() filter: Params;

  public totalItems: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.product$.subscribe(product => this.totalItems = product?.total);
  }

  setPaginate(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
    });
  }

}
