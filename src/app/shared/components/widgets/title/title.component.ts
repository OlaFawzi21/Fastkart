import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-title',
    imports: [],
    templateUrl: './title.component.html',
    styleUrl: './title.component.scss'
})
export class TitleComponent {

  @Input() class: string = 'title';
  @Input() svg: string = 'leaf';
  @Input() style: string;
  @Input() title?: string;
  @Input() description?: string;
  
}
