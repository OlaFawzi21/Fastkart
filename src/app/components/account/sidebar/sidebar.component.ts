import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interface/user.interface';
import { AccountState } from '../../../shared/state/account.state';
import { Notification } from '../../../shared/interface/notification.interface';
import { NotificationState } from '../../../shared/state/notification.state';
import { Logout } from '../../../shared/action/auth.action';
import { ConfirmationModalComponent } from '../../../shared/components/widgets/modal/confirmation-modal/confirmation-modal.component';
import { UpdateUserProfile } from '../../../shared/action/account.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, TranslateModule, RouterModule,
        TitleCasePipe, ButtonComponent, ConfirmationModalComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() show: boolean;
  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  notification$: Observable<Notification[]> = inject(Store).select(NotificationState.notification) as Observable<Notification[]>;
  user$: Observable<User> = inject(Store).select(AccountState.user) as Observable<User>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  public unreadNotificationCount: number;

  constructor(private store: Store) {
    this.notification$.subscribe((notification) => {
      this.unreadNotificationCount = notification?.filter(item => !item.read_at)?.length;
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  openMenu(value: boolean){
    this.menu.emit(value)
  }

   uploadImage(event:any){
    if(event?.target?.files){
      let form = new FormData();
      form.append("profile_image", event.target.files[0]);
      form.append("_method", "PUT");
      this.store.dispatch(new UpdateUserProfile(form));
    } else {
      let form = new FormData();
      form.append("profile_image_id", '');
      form.append("_method", "PUT");
      this.store.dispatch(new UpdateUserProfile(form));
    }
  }

}
