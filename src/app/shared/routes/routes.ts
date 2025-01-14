import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guard/auth.guard";

export const content: Routes = [
    {
        path: "",
        loadChildren: () => import('../../components/themes/themes.routes').then(r => r.themeRoutes)
    },
    {
        path: "auth",
        loadChildren: () => import("../../components/auth/auth.routes").then(r => r.authRoutes),
        canActivateChild : [AuthGuard]
    },
    {
        path: "account",
        loadChildren: () => import("../../components/account/account.routes").then(r => r.accountRoutes),
        canActivate : [AuthGuard]
    },
    {
        path: "",
        loadChildren: () => import('../../components/shop/shop.routes').then(r => r.shopRoutes)
    },
    {
        path: "",
        loadChildren: () => import('../../components/blog/blog.routes').then(r => r.blogRoutes)
    },
    {
        path: "",
        loadChildren: () => import('../../components/page/page.routes').then(r => r.pageRoutes)
    },
]
