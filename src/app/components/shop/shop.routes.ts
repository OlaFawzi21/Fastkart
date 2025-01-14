import { Routes } from "@angular/router";
import { CollectionComponent } from "./collection/collection.component";
import { ProductResolver } from "../../shared/resolvers/product.resolver";
import { ProductComponent } from "./product/product.component";
import { AuthGuard } from "../../core/guard/auth.guard";
import { CheckoutGuard } from "../../core/guard/checkout.guard";
import { BrandResolver } from "../../shared/resolvers/brand.resolver";
import { CategoryResolver } from "../../shared/resolvers/category.resolver";
import { StoreResolver } from "../../shared/resolvers/store.resolver";
import { BrandComponent } from "./brand/brand.component";
import { CartComponent } from "./cart/cart.component";
import { CategoryComponent } from "./category/category.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { CompareComponent } from "./compare/compare.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { SellerDetailsComponent } from "./seller/seller-details/seller-details.component";
import { SellerStoreComponent } from "./seller/seller-store/seller-store.component";
import { SellerComponent } from "./seller/seller.component";
import { AuthorComponent } from "./author/author.component";
import { AuthorResolver } from "../../shared/resolvers/author.resolver";
import { PublicationComponent } from "./publication/publication.component";
import { PublicationResolver } from "../../shared/resolvers/publication.resolver";

export const shopRoutes: Routes = [
   {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'compare',
    component: CompareComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:slug',
    component: ProductComponent,
    resolve: {
      data: ProductResolver
    }
  },
  {
    path: 'collections',
    component: CollectionComponent
  },
  {
    path: 'seller/become-seller',
    component: SellerComponent
  },
  {
    path: 'seller/stores',
    component: SellerStoreComponent
  },
  {
    path: 'seller/store/:slug',
    component: SellerDetailsComponent,
    resolve: {
      data: StoreResolver
    }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [CheckoutGuard]
  },
  {
    path: 'order/tracking',
    component: OrderTrackingComponent
  },
  {
    path: 'order/details',
    component: OrderDetailsComponent
  },
  {
    path: 'brand/:slug',
    component: BrandComponent,
    resolve: {
      data: BrandResolver
    }
  },
  {
    path: 'category/:slug',
    component: CategoryComponent,
    resolve: {
      data: CategoryResolver
    }
  },
  {
    path: 'author/:slug',
    component: AuthorComponent,
    resolve: {
      data: AuthorResolver
    }
  },
  {
    path: 'publication/:slug',
    component: PublicationComponent,
    resolve: {
      data: PublicationResolver
    }
  },
]