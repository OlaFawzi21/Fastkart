import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationState } from '../../../shared/state/notification.state';
import { MarkAsReadNotification } from '../../../shared/action/notification.action';
import { Notification } from "../../../shared/interface/notification.interface";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-notification',
    imports: [CommonModule, TranslateModule, NoDataComponent],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  notification$: Observable<Notification[]> = inject(Store).select(NotificationState.notification) as Observable<Notification[]>;

  constructor(private store: Store) {}

  ngOnDestroy() {
    this.store.dispatch(new MarkAsReadNotification());
  }

}
