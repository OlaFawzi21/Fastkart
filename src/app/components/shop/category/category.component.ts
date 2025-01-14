import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { GetProducts } from '../../../shared/action/product.action';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Category } from '../../../shared/interface/category.interface';
import { ProductModel } from '../../../shared/interface/product.interface';
import { CategoryState } from '../../../shared/state/category.state';
import { ProductState } from '../../../shared/state/product.state';
import { CollectionProductsComponent } from '../collection/widgets/collection-products/collection-products.component';
import { SidebarComponent } from '../collection/widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-category',
    imports: [BreadcrumbComponent, SidebarComponent, CollectionProductsComponent],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss'
})
export class CategoryComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);
  category$: Observable<Category> = inject(Store).select(CategoryState.selectedCategory) as Observable<Category>;

  public breadcrumb: Breadcrumb = {
    title: "Category",
    items: [{ label: '', active: false }]
  };
  public layout: string = 'collection_category_slider';
  public skeleton: boolean = true;
  public activeCategory: string | null;
  public category: Category;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 40, // Display per page,
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

  private subscriptions: Subscription = new Subscription();
  public totalItems: number = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store) {
      if(this.route.snapshot.paramMap.get('slug')){
        this.activeCategory = this.route.snapshot.paramMap.get('slug')
        this.filter['category'] = this.activeCategory
      }
  }

  ngOnInit() {
    this.subscriptions.add(this.category$.subscribe(category => {
      this.category = category;
      this.updateBreadcrumb();
      this.updateFilterAndFetchProducts();0
    }));

    this.filter['category'] = this.route.snapshot.paramMap.get('slug');
    this.store.dispatch(new GetProducts(this.filter));
  }

  private updateBreadcrumb() {
    this.breadcrumb.title = `Category: ${this.category?.name}`;
    this.breadcrumb.items[0].label = this.category?.name;
  }
 
  private updateFilterAndFetchProducts() {
    if (this.category) {
      this.filter['category'] = this.category.slug;
    }
    this.store.dispatch(new GetProducts(this.filter));
  }

  public changePage(page: number) {
    this.filter['category'] = page;
    this.updateFilterAndFetchProducts();
  }

  public changePaginate(paginate: number) {
    this.filter['paginate'] = paginate;
    this.updateFilterAndFetchProducts();
  }
}
