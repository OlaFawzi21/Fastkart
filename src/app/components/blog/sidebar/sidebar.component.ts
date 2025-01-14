import { Component, inject} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BlogService } from '../../../shared/services/blog.service';
import { BlogState } from '../../../shared/state/blog.state';
import { TagState } from '../../../shared/state/tag.state';
import { CategoryState } from '../../../shared/state/category.state';
import { TagModel } from '../../../shared/interface/tag.interface';
import { CategoryModel } from '../../../shared/interface/category.interface';
import { GetTags } from '../../../shared/action/tag.action';
import { Blog } from '../../../shared/interface/blog.interface';
import { GetRecentBlog } from '../../../shared/action/blog.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SkeletonBlogComponent } from '../skeleton-blog/skeleton-blog.component';
import { RecentPostComponent } from './recent-post/recent-post.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { BlogTagComponent } from './blog-tag/blog-tag.component';

@Component({
    selector: 'app-blog-sidebar',
    imports: [CommonModule, TranslateModule, NgbModule,
        SkeletonBlogComponent, RecentPostComponent, BlogCategoryComponent,
        BlogTagComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class BlogSidebarComponent {

  resentBlog$: Observable<Blog[]> = inject(Store).select(BlogState.resentBlog) as Observable<Blog[]>;
  tag$: Observable<TagModel> = inject(Store).select(TagState.tag) as Observable<TagModel>;
  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category) as Observable<CategoryModel>;

  constructor(public blogService: BlogService, private store: Store){
    this.store.dispatch(new GetTags({status: 1, type: 'post'}))
    this.store.dispatch(new GetRecentBlog({status: 1, type: 'post', paginate: '5'}))
  }

}
