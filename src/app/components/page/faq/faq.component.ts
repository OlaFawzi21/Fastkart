import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { PageState } from '../../../shared/state/page.state';
import { GetFaqs } from '../../../shared/action/page.action';
import { FaqModel } from '../../../shared/interface/page.interface';
import { PageService } from '../../../shared/services/page.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { SkeletonPageComponent } from '../skeleton-page/skeleton-page.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-faq',
    imports: [CommonModule, TranslateModule, NgbModule,
        BreadcrumbComponent, SkeletonPageComponent, NoDataComponent
    ],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss'
})
export class FaqComponent {

  public breadcrumb: Breadcrumb = {
    title: "FAQ's",
    items: [{ label: "FAQ's", active: true }]
  }

  faq$: Observable<FaqModel> = inject(Store).select(PageState.faq);

  constructor(private store: Store, public pageService: PageService) {
    this.pageService.skeletonLoader = true;
    this.store.dispatch(new GetFaqs()).subscribe({
      complete: () => {
        this.pageService.skeletonLoader = false;
      }
    });
  }

}
