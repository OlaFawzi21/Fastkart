import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WishlistModel } from '../../../../interface/wishlist.interface';
import { WishlistState } from '../../../../state/wishlist.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header-wishlist',
    imports: [CommonModule, RouterModule],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  @Input() style: string = 'basic';

  wishlist$: Observable<WishlistModel> = inject(Store).select(WishlistState.wishlistItems);

}
