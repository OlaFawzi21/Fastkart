import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BlogService } from '../../../../shared/services/blog.service';
import { BlogState } from '../../../../shared/state/blog.state';
import { Blog, BlogModel } from '../../../../shared/interface/blog.interface';
import * as data from '../../../../shared/data/owl-carousel';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { SkeletonBlogComponent } from '../../../blog/skeleton-blog/skeleton-blog.component';
@Component({
    selector: 'app-blog',
    imports: [CommonModule, TranslateModule, RouterModule,
        CarouselModule, NoDataComponent, SkeletonBlogComponent
    ],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent {

  blog$: Observable<BlogModel> = inject(Store).select(BlogState.blog) as Observable<BlogModel>;

  @Input() blogIds: number[] = [];
  @Input() sliderOption: OwlOptions;
  @Input() description: boolean;

  public blogs: Blog[] = [];
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);
  public blogOption = data.customOptionsItem3;

  constructor(public blogService: BlogService) {}

  ngOnChanges() {
    if (Array.isArray(this.blogIds)) {
      this.blog$.subscribe(blogs => {
        this.blogs = blogs.data.filter(blog => this.blogIds?.includes(blog?.id!));
      });
    }
  }

}
