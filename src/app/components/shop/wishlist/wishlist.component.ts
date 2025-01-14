import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetWishlist } from './../../../shared/action/wishlist.action';
import { WishlistState } from '../../../shared/state/wishlist.state';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { WishlistModel } from '../../../shared/interface/wishlist.interface';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { SkeletonProductBoxComponent } from '../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component';
import { ProductBoxComponent } from '../../../shared/components/widgets/product-box/product-box.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-wishlist',
    imports: [CommonModule, BreadcrumbComponent, SkeletonProductBoxComponent,
        ProductBoxComponent, NoDataComponent
    ],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  wishlistItems$: Observable<WishlistModel> = inject(Store).select(WishlistState.wishlistItems);
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Wishlist",
    items: [{ label: 'Wishlist', active: true }]
  }

  public skeletonItems = Array.from({ length: 12 }, (_, index) => index);

  constructor(private store: Store,
    public wishlistService: WishlistService){
    this.store.dispatch(new GetWishlist())
  }

}
