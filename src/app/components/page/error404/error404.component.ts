import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
    selector: 'app-error404',
    imports: [CommonModule, BreadcrumbComponent, ButtonComponent],
    templateUrl: './error404.component.html',
    styleUrl: './error404.component.scss'
})
export class Error404Component {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "404",
    items: [{ label: "404", active: true }]
  }

  constructor(private location: Location) {}

  back(){
    this.location.back();
  }

}
