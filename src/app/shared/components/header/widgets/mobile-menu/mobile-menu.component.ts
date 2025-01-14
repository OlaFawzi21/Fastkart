import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToggleSidebarCart } from '../../../../action/cart.action';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-mobile-menu',
    imports: [RouterModule],
    templateUrl: './mobile-menu.component.html',
    styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {

  public active: string = '/';

  constructor(private store: Store){}

  cartToggle(value: boolean) {
    this.store.dispatch(new ToggleSidebarCart(value));
  }

  activeMenu(menu: string){
    this.active = menu
  }
  
}
