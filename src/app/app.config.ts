import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi, withFetch, HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorService } from './shared/services/error.service';
import { NotificationService } from './shared/services/notification.service';
import { SeoService } from './shared/services/seo.service';
import { SettingService } from './shared/services/setting.service';
import { AccountState } from './shared/state/account.state';
import { AttributeState } from './shared/state/attribute.state';
import { AuthState } from './shared/state/auth.state';
import { BlogState } from './shared/state/blog.state';
import { BrandState } from './shared/state/brand.state';
import { CartState } from './shared/state/cart.state';
import { CategoryState } from './shared/state/category.state';
import { CompareState } from './shared/state/compare.state';
import { CountryState } from './shared/state/country.state';
import { CouponState } from './shared/state/coupon.state';
import { CurrencyState } from './shared/state/currency.state';
import { DownloadState } from './shared/state/download.state';
import { LanguageState } from './shared/state/language.state';
import { LoaderState } from './shared/state/loader.state';
import { MenuState } from './shared/state/menu.state';
import { NotificationState } from './shared/state/notification.state';
import { OrderStatusState } from './shared/state/order-status.state';
import { OrderState } from './shared/state/order.state';
import { PageState } from './shared/state/page.state';
import { PaymentDetailsState } from './shared/state/payment-details.state';
import { PointState } from './shared/state/point.state';
import { ProductState } from './shared/state/product.state';
import { QuestionAnswersState } from './shared/state/questions-answers.state';
import { RefundState } from './shared/state/refund.state';
import { ReviewState } from './shared/state/review.state';
import { SettingState } from './shared/state/setting.state';
import { StateState } from './shared/state/state.state';
import { StoreState } from './shared/state/store.state';
import { SubscriptionState } from './shared/state/subscription.state';
import { TagState } from './shared/state/tag.state';
import { ThemeOptionState } from './shared/state/theme-option.state';
import { ThemeState } from './shared/state/theme.state';
import { WalletState } from './shared/state/wallet.state';
import { WishlistState } from './shared/state/wishlist.state';
import { TranslationLoader } from './shared/services/translation-loader.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GlobalErrorHandlerInterceptor } from './core/interceptors/global-error-handler.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ZoneState } from './shared/state/zone.state';
import { AuthorState } from './shared/state/author.state';
import { PublicationState } from './shared/state/publication.state';

// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslationLoader(http);
// }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./locales/", ".json"); // Adjust path as needed
}

function appLoadFactory(config: SettingService) {
  return () => config.getReCaptchaConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideClientHydration(),
    CurrencyPipe,
    ErrorService,
    SeoService,
    NotificationService,
    {
      provide: RECAPTCHA_SETTINGS,
      useFactory: (config: SettingService): RecaptchaSettings => {
        return { siteKey: config.reCaptchaConfig?.site_key };
      },
      deps: [SettingService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appLoadFactory,
      deps: [SettingService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    importProvidersFrom(
      LoadingBarRouterModule,
      CarouselModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-center',
        preventDuplicates: true
      }),
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxsModule.forRoot([
      AccountState,
      AttributeState,
      BlogState,
      BrandState,
      CartState,
      CategoryState,
      CompareState,
      CouponState,
      CountryState,
      CurrencyState,
      DownloadState,
      LanguageState,
      LoaderState,
      MenuState,
      NotificationState,
      OrderStatusState,
      OrderState,
      PageState,
      PaymentDetailsState,
      PointState,
      ProductState,
      QuestionAnswersState,
      RefundState,
      ReviewState,
      SettingState,
      StateState,
      StoreState,
      SubscriptionState,
      TagState,
      ThemeOptionState,
      ThemeState,
      WalletState,
      WishlistState,
      ZoneState,
      AuthorState,
      PublicationState
    ]),
      NgxsModule.forFeature([AuthState]),
      RouterModule.forRoot(routes , {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      NgxsStoragePluginModule.forRoot({
        keys: [
          'auth',
          'account',
          'country',
          'state',
          'cart',
          'theme',
          'theme_option',
          'setting',
          'notification',
          'language',
          'zone'
        ]
      })
  )
  ]
};
