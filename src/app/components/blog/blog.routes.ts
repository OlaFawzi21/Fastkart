import { Routes } from "@angular/router";
import { BlogResolver } from "../../shared/resolvers/blog.resolver";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";
import { BlogComponent } from "./blog.component";

export const blogRoutes: Routes = [
  {
    path: 'blogs',
    component: BlogComponent
  },
  {
    path: 'blog/:slug',
    component: BlogDetailsComponent,
    resolve: {
      data: BlogResolver
    }
  }
];