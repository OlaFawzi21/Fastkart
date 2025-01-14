import { Component, ElementRef, Input, SimpleChanges, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuestionAnswersState } from '../../../../../../shared/state/questions-answers.state';
import { ReviewState } from '../../../../../../shared/state/review.state';
import { GetQuestionAnswers } from '../../../../../../shared/action/questions-answers.action';
import { GetReview } from '../../../../../../shared/action/review.action';
import { QnAModel } from '../../../../../../shared/interface/questions-answers.interface';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ReviewModel } from '../../../../../../shared/interface/review.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ProductReviewComponent } from '../product-review/product-review.component';
import { QuestionsAnswersComponent } from '../questions-answers/questions-answers.component';


@Component({
    selector: 'app-product-details-tabs',
    imports: [TranslateModule, NgbModule, CommonModule,
        ProductReviewComponent, QuestionsAnswersComponent
    ],
    templateUrl: './product-details-tabs.component.html',
    styleUrl: './product-details-tabs.component.scss'
})
export class ProductDetailsTabsComponent {

  @Input() product: Product | null;

  question$: Observable<QnAModel> = inject(Store).select(QuestionAnswersState.questionsAnswers);
  review$: Observable<ReviewModel> = inject(Store).select(ReviewState.review);

  public active = 'description';
  public showMore: boolean;
  public height: number;
  public width: number;
  constructor(private store: Store, private sanitizer: DomSanitizer){}

  @ViewChild('description', {static: false}) descriptionElement: ElementRef;

  ngAfterViewInit() {
    // Use a timeout to ensure that the element is rendered before trying to access its height
    setTimeout(() => {
      const description = this.descriptionElement?.nativeElement;
      this.height = description?.offsetHeight;
      this.width = window.innerWidth;
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    let product = changes['product']?.currentValue;
    this.store.dispatch(new GetQuestionAnswers({product_id: product.id}));
    this.store.dispatch(new GetReview({product_id: product.id}));
  }

  getTrustedHtml(data?:string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(data!);
  }

  seeMore(){
    this.showMore = !this.showMore
  }

}
