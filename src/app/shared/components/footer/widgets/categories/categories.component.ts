import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryModel, Category } from '../../../../interface/category.interface';
import { CategoryState } from '../../../../state/category.state';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer-categories',
    imports: [RouterModule],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class FooterCategoriesComponent {

  @Input() data: Option | null;

  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category) as Observable<CategoryModel>;

  public categories: Category[];

  ngOnChanges(changes: SimpleChanges) {
    const ids = changes['data']?.currentValue?.footer?.footer_categories
    if (Array.isArray(ids)) {
      this.category$.subscribe(categories => {
        if(Array.isArray(categories.data)) {
          this.categories = categories.data.filter(category => ids?.includes(category.id));
        }
      })
    }
  }

}
