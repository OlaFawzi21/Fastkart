import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-footer-social-links',
    imports: [TranslateModule],
    templateUrl: './social-links.component.html',
    styleUrl: './social-links.component.scss'
})
export class FooterSocialLinksComponent {

  @Input() data: Option | null;

}
