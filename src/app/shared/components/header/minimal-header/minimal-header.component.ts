import { Component, HostListener, Input } from '@angular/core';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TopbarComponent } from '../widgets/topbar/topbar.component';
import { NavbarMenuButtonComponent } from '../widgets/navbar-menu-button/navbar-menu-button.component';
import { LogoComponent } from '../widgets/logo/logo.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { SearchComponent } from '../widgets/search/search.component';
import { WishlistComponent } from '../widgets/wishlist/wishlist.component';
import { CartComponent } from '../widgets/cart/cart.component';
import { MyAccountComponent } from '../widgets/my-account/my-account.component';

@Component({
    selector: 'app-minimal-header',
    imports: [TranslateModule, TopbarComponent, NavbarMenuButtonComponent,
        LogoComponent, ButtonComponent, MenuComponent,
        SearchComponent, WishlistComponent, CartComponent,
        MyAccountComponent
    ],
    templateUrl: './minimal-header.component.html',
    styleUrl: './minimal-header.component.scss'
})
export class MinimalHeaderComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() sticky: boolean | number | undefined; // Default false
  @Input() class: string | undefined;

  public stick: boolean = false;
  public active: boolean = false;

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) {
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  toggle(val: boolean){
    this.active = val;
  }

}
