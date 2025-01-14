import { Component, inject, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from "../../../shared/interface/account.interface";
import { AccountState } from '../../../shared/state/account.state';
import { DeleteAddress } from '../../../shared/action/account.action';
import { AddressModalComponent } from '../../../shared/components/widgets/modal/address-modal/address-modal.component';
import { DeleteModalComponent } from '../../../shared/components/widgets/modal/delete-modal/delete-modal.component';
import { UserAddress } from '../../../shared/interface/user.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-addresses',
    imports: [CommonModule, TranslateModule, TitleCasePipe,
        ButtonComponent, NoDataComponent, AddressModalComponent,
        DeleteModalComponent
    ],
    templateUrl: './addresses.component.html',
    styleUrl: './addresses.component.scss'
})
export class AddressesComponent {

  user$: Observable<AccountUser> = inject(Store).select(AccountState.user) as Observable<AccountUser>;

  @ViewChild("addressModal") AddressModal: AddressModalComponent;
  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  constructor(private store: Store) {
  }

  delete(action: string, data: UserAddress) {
    if(action == 'delete' && data)
      this.store.dispatch(new DeleteAddress(data.id));
  }

}
