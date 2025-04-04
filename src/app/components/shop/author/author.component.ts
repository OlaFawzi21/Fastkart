import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { GetProducts } from "../../../shared/action/product.action";
import { BreadcrumbComponent } from "../../../shared/components/widgets/breadcrumb/breadcrumb.component";
import { Author } from "../../../shared/interface/author.interface";
import { Breadcrumb } from "../../../shared/interface/breadcrumb";
import { Params } from "../../../shared/interface/core.interface";
import { ProductModel } from "../../../shared/interface/product.interface";
import { AuthorState } from "../../../shared/state/author.state";
import { ProductState } from "../../../shared/state/product.state";
import { CollectionProductsComponent } from "../collection/widgets/collection-products/collection-products.component";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-author",
  imports: [
    CommonModule,
    BreadcrumbComponent,
    CollectionProductsComponent,
    TranslatePipe,
  ],
  templateUrl: "./author.component.html",
  styleUrl: "./author.component.scss",
})
export class AuthorComponent {
  product$: Observable<ProductModel> = inject(Store).select(
    ProductState.product
  );
  author$: Observable<Author> = inject(Store).select(
    AuthorState.selectedAuthor
  ) as Observable<Author>;

  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("category"),
    items: [{ label: "", active: false }],
  };
  public activeAuthor: string | null;
  public author: Author;
  public filter: Params = {
    page: 1, // Current page number
    paginate: 40, // Display per page
    status: 1,
    field: "created_at",
    price: "",
    category: "",
    tag: "",
    sort: "asc", // ASC, DSC
    sortBy: "asc",
    rating: "",
    attribute: "",
  };

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private translate: TranslateService
  ) {
    if (this.route.snapshot.paramMap.get("slug")) {
      this.activeAuthor = this.route.snapshot.paramMap.get("slug");
    }
  }

  ngOnInit() {
    this.author$.subscribe((author) => (this.author = author));
    this.breadcrumb.title = `${this.translate.instant("author")}: ${
      this.author?.author_name
    }`;
    this.breadcrumb.items[0].label = this.author?.author_name;
    this.filter["author_id"] = this.author.id;
    this.store.dispatch(new GetProducts(this.filter));
  }
}
