import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ProductState } from '../../../../../state/product.state';
import { Product } from '../../../../../interface/product.interface';
import { Category } from '../../../../../interface/category.interface';
import { CategoryService } from '../../../../../services/category.service';
import { ProductService } from '../../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HighlighterPipe } from '../../../../../pipe/highlighter.pipe';

@Component({
    selector: 'app-search-dropdown',
    imports: [CommonModule, TranslateModule, RouterModule,
        HighlighterPipe],
    templateUrl: './search-dropdown.component.html',
    styleUrl: './search-dropdown.component.scss'
})
export class SearchDropdownComponent {

  @Input() term : any;
  @Input() isOpenResult : boolean;
  @Input() selectedResultIndex: any;
  @Input() categories: Category[];
  @Input() products: Product[];
  @Input() selectedCategory: String;

  @ViewChild('resultsContainer') resultsContainer: ElementRef;

  productBySearch$: Observable<any> = inject(Store).select(ProductState.productBySearch);

  public skeleton = Array.from({ length: 3 }, (_, index) => index);

  constructor(public categoryService: CategoryService, public productService: ProductService, public router: Router){}

}
