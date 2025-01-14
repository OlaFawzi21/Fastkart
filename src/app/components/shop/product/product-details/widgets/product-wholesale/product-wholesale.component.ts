import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency-symbol.pipe';

@Component({
    selector: 'app-product-wholesale',
    imports: [TranslateModule, CurrencySymbolPipe],
    templateUrl: './product-wholesale.component.html',
    styleUrl: './product-wholesale.component.scss'
})
export class ProductWholesaleComponent {

  @Input() product: Product | null;

}
