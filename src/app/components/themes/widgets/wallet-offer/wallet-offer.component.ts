import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { environment } from '../../../../../environments/environment';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';
import * as data from '../../../../shared/data/owl-carousel';
import { Offer } from '../../../../shared/interface/theme.interface';

@Component({
    selector: 'app-wallet-offer',
    imports: [TranslateModule, CarouselModule, FormsModule,
        ButtonComponent],
    templateUrl: './wallet-offer.component.html',
    styleUrl: './wallet-offer.component.scss'
})
export class WalletOfferComponent {

  @Input() offers: Offer[];

  public customOptionsItem3 = data.customOptionsItem3;
  public storageURL = environment.storageURL;

  constructor(){}

  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }

}
