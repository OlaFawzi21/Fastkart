import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../../../shared/interface/product.interface';
import { ProductState } from '../../../../shared/state/product.state';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-image-link',
    imports: [CommonModule, RouterModule],
    templateUrl: './image-link.component.html',
    styleUrl: './image-link.component.scss'
})
export class ImageLinkComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  @Input() image: any;
  @Input() link: string;
  @Input() bgImage: boolean;
  @Input() class: string;

  public storageURL = environment.storageURL;

  constructor(){}

  getProductSlug(id: number, products: Product[]){
    let product = products.find(product => product.id === id);
    return product ? product.slug : null;
  }

}
