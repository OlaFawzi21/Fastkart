import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from './shared/action/auth.action';
import { GetCartItems } from './shared/action/cart.action';
import { GetCountries } from './shared/action/country.action';
import { GetCurrencies } from './shared/action/currency.action';
import { GetLanguage } from './shared/action/language.action';
import { GetSettingOption } from './shared/action/setting.action';
import { GetStates } from './shared/action/state.action';
import { GetThemeOption } from './shared/action/theme-option.action';
import { GetThemes } from './shared/action/theme.action';
import { Analytics, Values } from './shared/interface/setting.interface';
import { Option } from './shared/interface/theme-option.interface';
import { SeoService } from './shared/services/seo.service';
import { SettingState } from './shared/state/setting.state';
import { ThemeOptionState } from './shared/state/theme-option.state';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public favIcon: HTMLLinkElement | null;
  public isTabInFocus = true;

  constructor(
    public meta: Meta,
    public seoService: SeoService,
    @Inject(DOCUMENT) document: Document,
    config: NgbRatingConfig, private actions: Actions,
    private router: Router,
    private store: Store) {

    config.max = 5;
    config.readonly = true;

    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetStates());
    this.store.dispatch(new GetCartItems());
    this.store.dispatch(new GetSettingOption());
    this.store.dispatch(new GetThemeOption());
    this.store.dispatch(new GetCurrencies({ status: 1 }));
    this.store.dispatch(new GetThemes());
    this.store.dispatch(new GetLanguage());

    this.themeOption$.subscribe(theme => {

      if(theme?.general?.mode === 'dark') {
        document.getElementsByTagName('html')[0].classList.add(theme?.general && theme?.general?.mode)
      } else {
        document.getElementsByTagName('html')[0].classList.remove('dark')
      }

      // Set Direction
      if(theme?.general?.language_direction === 'rtl' || this.store.selectSnapshot(state => state.language && state.language.defaultLanguage.is_rtl)){
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
    } else {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
      document.body.classList.remove('rtl');
    }

      // Set Favicon
      this.favIcon = document.querySelector('#appIcon');
      this.favIcon!.href = theme?.logo?.favicon_icon?.original_url;

    });

    this.setting$.subscribe(option => {
      if(option?.analytics){
        if(option?.analytics?.google_analytics && option?.analytics?.google_analytics.status){
          this.loadScript(option?.analytics);
        }
      }
    })

    // }

    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  loadScript(val: Analytics): void {
    if(val.google_analytics.status){
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${val.google_analytics.measurement_id}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${val.google_analytics.measurement_id}');
      `;
      document.head.appendChild(configScript);
    }

    if(val.facebook_pixel.status){
      const script = document.createElement('script');
      script.src = `https://www.facebook.com/tr?id=${val.facebook_pixel.pixel_id}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${val.facebook_pixel.pixel_id}');
      fbq('track', 'PageView');
      `;
      document.head.appendChild(configScript);
    }
  }

}
