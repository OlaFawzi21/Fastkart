import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { ClickOutsideDirective } from '../../../directive/out-side-directive';
import { Option } from '../../../interface/theme-option.interface';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-theme-customizer',
    imports: [CommonModule, TranslateModule, FormsModule,
        ButtonComponent, ClickOutsideDirective
    ],
    templateUrl: './theme-customizer.component.html',
    styleUrl: './theme-customizer.component.scss'
})
export class ThemeCustomizerComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public open: boolean = false;
  public show: boolean = false;
  public mode: string;
  public value: string;
  public theme_color: string;
  public secondary_color: string;
  public theme: string

  constructor(
    public themeOptionService: ThemeOptionService) {
  }

  ngOnInit() {

    this.themeOption$.subscribe(option => {
      this.mode = option?.general ? option?.general?.mode : 'light';
      this.value = option?.general ? option?.general?.language_direction : 'ltr';
    })
  }

  toggle(){
    this.open = !this.open;
  }

  layout(value: string){
    this.value = value;
    if(value === 'rtl'){
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }

  layoutMode(value: string){
    this.mode = value;
    if(this.mode === 'dark') {
      document.getElementsByTagName('html')[0].classList.add('dark')
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark')
    }
  }

  customizeThemeColor(event: any, val:string){
    document.documentElement.style.setProperty(val, event.target.value);
  }

  closeDropdown(){
    this.open = false;
  }

}
