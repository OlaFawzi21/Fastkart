import { Component, Input } from '@angular/core';
import { Category } from '../../../../shared/interface/category.interface';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-blog-category',
    imports: [RouterModule, CommonModule, NoDataComponent],
    templateUrl: './blog-category.component.html',
    styleUrl: './blog-category.component.scss'
})
export class BlogCategoryComponent {

  @Input() data: Category[];

}
