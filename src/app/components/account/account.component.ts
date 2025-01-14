import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { LoaderState } from '../../shared/state/loader.state';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { GetNotification } from '../../shared/action/notification.action';
import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from '../../shared/components/widgets/loader/loader.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/widgets/button/button.component';

@Component({
    selector: 'app-account',
    imports: [CommonModule, TranslateModule, RouterModule,
        BreadcrumbComponent, SidebarComponent, LoaderComponent,
        ButtonComponent],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {

  loadingStatus$: Observable<boolean> = inject(Store).select(LoaderState.status) as Observable<boolean>;

  public open: boolean = false;
  public breadcrumb: Breadcrumb = {
    title: "Dashboard",
    items: [{ label: 'Dashboard', active: false }]
  };

  constructor(private store: Store, private router: Router) {
    this.store.dispatch(new GetNotification());

      this.breadcrumb.title = this.router?.url?.split('?')[0]?.split('/')?.pop()!;
      if(this.router?.url.includes('order/details')) {
        this.breadcrumb.title = 'Order';
      }
      this.breadcrumb.items = [];
      this.breadcrumb.items.push({ label: this.breadcrumb.title, active: false });
  }

  openMenu(value: boolean) {
    this.open = value;
  }

}
