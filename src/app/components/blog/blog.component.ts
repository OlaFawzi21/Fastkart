import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BlogService } from '../../shared/services/blog.service';
import { ThemeOptionState } from '../../shared/state/theme-option.state';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { GetBlogs } from '../../shared/action/blog.action';
import { BlogState } from '../../shared/state/blog.state';
import { BlogModel } from '../../shared/interface/blog.interface';
import { Option } from '../../shared/interface/theme-option.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SummaryPipe } from '../../shared/pipe/summary.pipe';
import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { SkeletonBlogComponent } from './skeleton-blog/skeleton-blog.component';
import { PaginationComponent } from '../../shared/components/widgets/pagination/pagination.component';
import { NoDataComponent } from '../../shared/components/widgets/no-data/no-data.component';
import { BlogSidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: "app-blog",
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule,
    SummaryPipe,
    BreadcrumbComponent,
    SkeletonBlogComponent,
    PaginationComponent,
    NoDataComponent,
    BlogSidebarComponent,
  ],
  templateUrl: "./blog.component.html",
  styleUrl: "./blog.component.scss",
})
export class BlogComponent {
  blog$: Observable<BlogModel> = inject(Store).select(
    BlogState.blog
  ) as Observable<BlogModel>;
  themeOption$: Observable<Option> = inject(Store).select(
    ThemeOptionState.themeOptions
  ) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("blogs"),
    items: [],
  };

  public filter = {
    page: 1, // Current page number
    paginate: 12, // Display per page,
    status: 1,
    category: "",
    tag: "",
  };

  public totalItems: number = 0;
  public skeletonItems = Array.from({ length: 9 }, (_, index) => index);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public blogService: BlogService,
    private translate: TranslateService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.filter.category = params["category"] ? params["category"] : "";
      this.filter.tag = params["tag"] ? params["tag"] : "";

      this.breadcrumb.items = [];
      this.breadcrumb.title = this.filter.category
        ? `${this.translate.instant("blogs")}: ${this.filter.category.replaceAll("-", " ")}`
        : this.filter.tag
        ? `${this.translate.instant("blogs")}: ${this.filter.tag.replaceAll(
            "-",
            " "
          )}`
        : this.translate.instant("blogs");
      this.breadcrumb.items.push({
        label: this.translate.instant("blogs"),
        active: true,
      });

      this.store.dispatch(new GetBlogs(this.filter));
    });
    this.blog$.subscribe((blog) => (this.totalItems = blog?.total));
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.store.dispatch(new GetBlogs(this.filter));
  }
}
