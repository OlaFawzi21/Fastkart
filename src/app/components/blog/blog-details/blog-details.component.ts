import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Blog } from "../../../shared/interface/blog.interface";
import { BlogState } from "../../../shared/state/blog.state";
import { Breadcrumb } from "../../../shared/interface/breadcrumb";
import { ThemeOptionState } from "../../../shared/state/theme-option.state";
import { Option } from "../../../shared/interface/theme-option.interface";
import { SeoService } from "../../../shared/services/seo.service";
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from "../../../shared/components/widgets/breadcrumb/breadcrumb.component";
import { BlogSidebarComponent } from "../sidebar/sidebar.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-blog-details",
  imports: [CommonModule, BreadcrumbComponent, BlogSidebarComponent],
  templateUrl: "./blog-details.component.html",
  styleUrl: "./blog-details.component.scss",
})
export class BlogDetailsComponent {
  blog$: Observable<Blog> = inject(Store).select(
    BlogState.selectedBlog
  ) as Observable<Blog>;
  themeOption$: Observable<Option> = inject(Store).select(
    ThemeOptionState.themeOptions
  ) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("product"),
    items: [],
  };

  public sidebar: string;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.blog$.subscribe((blog) => {
      this.breadcrumb.items = [];
      this.breadcrumb.title = blog.title;
      this.breadcrumb.items.push(
        { label: this.translate.instant("blog"), active: true },
        { label: blog.title, active: false }
      );
    });

    // For Demo Purpose only
    this.route.queryParams.subscribe((params) => {
      if (params["sidebar"]) {
        this.sidebar = params["sidebar"];
      } else {
        // Get Blog Layout
        this.themeOption$.subscribe((theme) => {
          this.sidebar = theme?.blog.blog_sidebar_type;
        });
      }
    });
  }
}
