import { Component, inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languages } from '../../../../../shared/interface/theme-option.interface';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/out-side-directive';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../../state/setting.state';
import { Values } from '../../../../interface/setting.interface';
import { Language, LanguageModel } from '../../../../interface/language.interface';
import { SetDefaultLanguage } from '../../../../action/language.action';
import { CommonModule } from '@angular/common';
import { TranslationLoader } from '../../../../services/translation-loader.service';
import { LanguageState } from '../../../../state/language.state';

@Component({
    selector: 'app-language',
    imports: [ButtonComponent, ClickOutsideDirective, CommonModule],
    templateUrl: './language.component.html',
    styleUrl: './language.component.scss'
})
export class LanguageComponent {

  @Input() style: string = 'basic';

  language$: Observable<LanguageModel> = inject(Store).select(LanguageState.language) as Observable<LanguageModel>;
  defaultLanguage$: Observable<Language> = inject(Store).select(LanguageState.defaultLanguage) as Observable<Language>;
  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;

  public active: boolean = false;
  
  constructor(private translate: TranslateService, 
    private store: Store, 
    private translationLoader: TranslationLoader) {}

  ngOnInit() {
    this.defaultLanguage$.subscribe((language) => {
      if(language) {
        this.translate.use(language.locale);
      }
    })
    // this.translationLoader.getTranslation();
  }

  selectLanguage(language: Language){
    this.active = false;
    this.store.dispatch(new SetDefaultLanguage(language))
    this.translate.use(language.locale);
    location.reload();
  }

  openDropDown(){
    this.active = !this.active;
  }

  hideDropdown(){
    this.active = false;
  }

}
