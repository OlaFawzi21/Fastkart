import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';

@Component({
    selector: 'app-theme-categories',
    imports: [CategoriesComponent],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class ThemeCategoriesComponent {

  @Input() categoryIds: number[] = [];
  @Input() style: string = 'vertical';
  @Input() title?: string;
  @Input() image?: string;
  @Input() theme: string;
  @Input() sliderOption: OwlOptions;
  @Input() selectedCategoryId: number;

  @Output() selectedCategory: EventEmitter<number> = new EventEmitter();

  constructor(){}

  selectCategory(id: number) {
    this.selectedCategory.emit(id);
  }

}
