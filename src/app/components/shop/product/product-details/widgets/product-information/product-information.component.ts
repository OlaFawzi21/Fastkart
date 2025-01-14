import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../../../../shared/pipe/title-case.pipe';

@Component({
    selector: 'app-product-information',
    imports: [TranslateModule, TitleCasePipe],
    templateUrl: './product-information.component.html',
    styleUrl: './product-information.component.scss'
})
export class ProductInformationComponent {

  @Input() product: Product | null;

}
