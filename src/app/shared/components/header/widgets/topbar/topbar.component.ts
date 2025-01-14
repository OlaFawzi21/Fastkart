import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Option } from '../../../../interface/theme-option.interface';
import { CurrencyComponent } from '../currency/currency.component';
import { LanguageComponent } from '../language/language.component';
import { LocationComponent } from '../location/location.component';
import { NoticeComponent } from '../notice/notice.component';

@Component({
    selector: 'app-topbar',
    imports: [TranslateModule, NoticeComponent, LanguageComponent, CommonModule, FormsModule,
        CurrencyComponent, LocationComponent
    ],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

  @Input() data: Option | null;

  public is_zone: boolean;
  public is_zone_selected: number[];
  public zone_toggle: boolean = false;

  constructor(private store: Store){
    this.is_zone = this.store.selectSnapshot(state => state?.setting?.setting?.activation?.zone_enable);
    this.is_zone_selected = this.store.selectSnapshot(state => state.zone.selectedZone).length || this.store.selectSnapshot(state => state.zone.location);
  }

}
