import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select  } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../shared/state/theme.state';
import { GetHomePage } from '../../shared/action/theme.action';
import { ThemeOptionService } from '../../shared/services/theme-option.service';
import { ParisComponent } from './paris/paris.component';
import { TokyoComponent } from './tokyo/tokyo.component';
import { OsakaComponent } from './osaka/osaka.component';
import { RomeComponent } from './rome/rome.component';
import { MadridComponent } from './madrid/madrid.component';
import { BerlinComponent } from './berlin/berlin.component';
import { DenverComponent } from './denver/denver.component';
import { CairoComponent } from './cairo/cairo.component';
import { MoscowComponent } from './moscow/moscow.component';

@Component({
    selector: 'app-themes',
    imports: [ParisComponent, TokyoComponent, OsakaComponent,
        RomeComponent, MadridComponent, BerlinComponent,
        DenverComponent, CairoComponent, MoscowComponent
    ],
    templateUrl: './themes.component.html',
    styleUrl: './themes.component.scss'
})
export class ThemesComponent {

  homePage$: Observable<object | null> = inject(Store).select(ThemeState.homePage) as Observable<object | null>;
  activeTheme$: Observable<string> = inject(Store).select(ThemeState.activeTheme) as Observable<string>;

  public theme: string;
  public homePage: any;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) {
      this.route.queryParams.subscribe(params => {
        this.themeOptionService.preloader = true;
        this.activeTheme$.subscribe(theme => {
          this.theme = params['theme'] ? params['theme'] : theme;
          if(this.theme){
            this.store.dispatch(new GetHomePage(params['theme'] ? params['theme'] : theme)).subscribe((data: any) => {
              this.homePage = data.theme.homePage;
              this.themeOptionService.preloader = false;
            })
          }
        })
    });
  }


  ngOnDestroy(){
    document.body.classList.remove('home');
  }

}
