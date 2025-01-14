import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { environment } from '../../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-seller',
    imports: [TranslateModule, BreadcrumbComponent],
    templateUrl: './seller.component.html',
    styleUrl: './seller.component.scss'
})
export class SellerComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Become Seller",
    items: [{ label: 'Become Seller', active: true }]
  }
  public storageURL = environment.storageURL;
  public data?: Option;

  constructor(){
    this.themeOption$.subscribe(data => this.data = data);
  }

}
