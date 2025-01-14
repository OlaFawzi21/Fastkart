import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { CategoriesComponent } from '../../../widgets/categories/categories.component';

@Component({
    selector: 'app-header-categories',
    imports: [TranslateModule, ButtonComponent, CategoriesComponent],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesBlockComponent {

  @Input() data: Option | null;

}
