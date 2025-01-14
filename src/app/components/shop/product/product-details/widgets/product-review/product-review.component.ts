import { Component, Input, ViewChild } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ReviewModalComponent } from '../../../../../../shared/components/widgets/modal/review-modal/review-modal.component';
import { Review } from '../../../../../../shared/interface/review.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoDataComponent } from '../../../../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-product-review',
    imports: [CommonModule, TranslateModule, NgbModule,
        ButtonComponent, NoDataComponent, ReviewModalComponent],
    templateUrl: './product-review.component.html',
    styleUrl: './product-review.component.scss'
})
export class ProductReviewComponent {

  @Input() product: Product | null;
  @Input() reviews: Review[] = [];

  @ViewChild("reviewModal") ProfileModal: ReviewModalComponent;

}
