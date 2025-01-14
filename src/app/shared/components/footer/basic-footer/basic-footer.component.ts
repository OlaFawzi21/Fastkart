import { Component, Input } from '@angular/core';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { FooterLogoComponent } from '../widgets/logo/logo.component';
import { FooterAboutComponent } from '../widgets/about/about.component';
import { FooterCategoriesComponent } from '../widgets/categories/categories.component';
import { FooterLinksComponent } from '../widgets/links/links.component';
import { FooterContactComponent } from '../widgets/contact/contact.component';
import { FooterCopyrightComponent } from '../widgets/copyright/copyright.component';
import { FooterPaymentOptionsComponent } from '../widgets/payment-options/payment-options.component';
import { FooterSocialLinksComponent } from '../widgets/social-links/social-links.component';
import { NoDataComponent } from '../../widgets/no-data/no-data.component';
import { Footer } from '../../../interface/theme.interface';

@Component({
    selector: 'app-basic-footer',
    imports: [TranslateModule, FooterLogoComponent, FooterAboutComponent,
        FooterCategoriesComponent, FooterLinksComponent, FooterContactComponent,
        FooterCopyrightComponent, FooterPaymentOptionsComponent, FooterSocialLinksComponent,
        NoDataComponent
    ],
    templateUrl: './basic-footer.component.html',
    styleUrl: './basic-footer.component.scss'
})
export class BasicFooterComponent {

  @Input() data: Option | null;
  @Input() footer: Footer;

  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false
  };

  toggle(value: string){
    this.active[value] = !this.active[value];
  }
  
}
