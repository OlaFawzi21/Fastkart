import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../../shared/interface/store.interface';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-vendor-contain',
    imports: [RouterModule, TranslateModule],
    templateUrl: './vendor-contain.component.html',
    styleUrl: './vendor-contain.component.scss'
})
export class VendorContainComponent {

  @Input() store: Stores;

}
