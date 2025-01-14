import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { CategoriesComponent } from '../../../../../shared/components/widgets/categories/categories.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-collection-categories',
    imports: [CommonModule, CategoriesComponent],
    templateUrl: './collection-categories.component.html',
    styleUrl: './collection-categories.component.scss'
})
export class CollectionCategoriesComponent {

  @Input() style: string = 'vertical';
  @Input() image: string;
  @Input() theme: string;
  @Input() title: string;
  @Input() sliderOption: OwlOptions;


  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

}
