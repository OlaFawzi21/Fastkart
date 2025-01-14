import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-digital-product-contain',
  imports: [TranslateModule, RouterModule],
  templateUrl: './digital-product-contain.component.html',
  styleUrl: './digital-product-contain.component.scss'
})
export class DigitalProductContainComponent {

  @Input() product: Product;

}
