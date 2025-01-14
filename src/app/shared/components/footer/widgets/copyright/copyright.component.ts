import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
    selector: 'app-footer-copyright',
    imports: [],
    templateUrl: './copyright.component.html',
    styleUrl: './copyright.component.scss'
})
export class FooterCopyrightComponent {

  @Input() data: Option | null;

}
