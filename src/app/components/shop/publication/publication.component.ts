import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetProducts } from '../../../shared/action/product.action';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Params } from '../../../shared/interface/core.interface';
import { ProductModel } from '../../../shared/interface/product.interface';
import { Publication } from '../../../shared/interface/publication.interface';
import { ProductState } from '../../../shared/state/product.state';
import { PublicationState } from '../../../shared/state/publication.state';
import { CollectionProductsComponent } from '../collection/widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-publication',
    imports: [CommonModule, BreadcrumbComponent, CollectionProductsComponent, TranslatePipe],
    templateUrl: './publication.component.html',
    styleUrl: './publication.component.scss'
})
export class PublicationComponent {


  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);
  publication$: Observable<Publication> = inject(Store).select(PublicationState.selectedPublication) as Observable<Publication>;


  public breadcrumb: Breadcrumb = {
    title: "Category",
    items: [{ label: '', active: false }]
  };
  public activeAuthor: string | null;
  public publication: Publication;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 40, // Display per page
    'status': 1,
    'field': 'created_at',
    'price': '',
    'category': '',
    'tag': '',
    'sort': 'asc', // ASC, DSC
    'sortBy': 'asc',
    'rating': '',
    'attribute': ''
  };

  constructor(
    private route: ActivatedRoute,
    private store: Store) {
      if(this.route.snapshot.paramMap.get('slug')){
        this.activeAuthor = this.route.snapshot.paramMap.get('slug')
      }
  }

  ngOnInit() {
    this.publication$.subscribe(publication => this.publication = publication)
    this.breadcrumb.title = `Author: ${this.publication?.publisher_name}`;
    this.breadcrumb.items[0].label = this.publication?.publisher_name;
    this.filter['publication_id'] = this.publication.id
    this.store.dispatch(new GetProducts(this.filter));
  }
}
