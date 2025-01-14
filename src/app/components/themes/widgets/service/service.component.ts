import { Component, Input } from '@angular/core';
import { Services } from '../../../../shared/interface/theme.interface';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-service',
    imports: [],
    templateUrl: './service.component.html',
    styleUrl: './service.component.scss'
})
export class ServiceComponent {

  @Input() data: Services[];

  public storageURL = environment.storageURL;

}
