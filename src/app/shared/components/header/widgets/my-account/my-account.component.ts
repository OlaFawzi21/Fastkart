import { Component, inject, Input, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from '../../../../action/auth.action';
import { AccountUser } from '../../../../interface/account.interface';
import { AccountState } from '../../../../state/account.state';
import { AuthState } from '../../../../state/auth.state';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from '../../../widgets/modal/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-my-account',
    imports: [CommonModule, TranslateModule, RouterModule, ConfirmationModalComponent],
    templateUrl: './my-account.component.html',
    styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {

  @Input() style: string = 'basic';

  isAuthenticated$: Observable<Boolean> = inject(Store).select(AuthState.isAuthenticated)
  user$: Observable<AccountUser> = inject(Store).select(AccountState.user) as Observable<AccountUser>;

  @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }

}
