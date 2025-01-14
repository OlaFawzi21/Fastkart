import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SummaryPipe } from '../../../../../../shared/pipe/summary.pipe';

@Component({
    selector: 'app-store-information',
    imports: [TranslateModule, RouterModule, SummaryPipe],
    templateUrl: './store-information.component.html',
    styleUrl: './store-information.component.scss'
})
export class StoreInformationComponent {

  @Input() store: Stores | null;

}
