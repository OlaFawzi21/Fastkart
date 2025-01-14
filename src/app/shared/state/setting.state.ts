import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { SettingService } from "../services/setting.service";
import { GetSettingOption, SelectedCurrency } from "../action/setting.action";
import { Values } from "../interface/setting.interface";
import { Currency } from "../interface/currency.interface";
import { SetDefaultLanguage } from "../action/language.action";
import { TranslateService } from "@ngx-translate/core";

export class SettingStateModel {
  setting: Values | null;
  selectedCurrency: Currency | null;
}

@State<SettingStateModel>({
  name: "setting",
  defaults: {
    setting: null,
    selectedCurrency: null
  }
})
@Injectable()
export class SettingState {

  constructor(private settingService: SettingService, private store: Store, private translate: TranslateService) {}

  @Selector()
  static setting(state: SettingStateModel) {
    if(state && state.setting) {
      return state.setting;
    }
  }

  @Selector()
  static selectedCurrency(state: SettingStateModel) {
    return state.selectedCurrency;
  }

  @Action(GetSettingOption)
  getSettingOptions(ctx: StateContext<SettingStateModel>) {
    return this.settingService.getSettingOption().pipe(
      tap({
        next: (result) => {
          if(result && result.values) {
            const state = ctx.getState();

            if(this.store.selectSnapshot(state => state.language && state.language.defaultLanguage)){
              const lang = this.store.selectSnapshot(state => state.language && state.language.defaultLanguage)
              this.translate.use(lang?.locale);
            } else {
              this.translate.use(result?.values?.general.default_language?.locale);
              this.store.dispatch(new SetDefaultLanguage(result?.values?.general.default_language))
            }

            if(!state.selectedCurrency && result?.values?.general){
              state.selectedCurrency = result?.values?.general.default_currency;
            }

            if(state.selectedCurrency) {
              if(state.selectedCurrency.id ==  result?.values?.general.default_currency.id && state.selectedCurrency.exchange_rate != result?.values?.general.default_currency.exchange_rate) {
                state.selectedCurrency = result?.values?.general.default_currency;
              }
            }

            ctx.patchState({
              ...state,
              setting: result.values,
            });
          }
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  @Action(SelectedCurrency)
  selectedCurrency(ctx: StateContext<SettingStateModel>, action: SelectedCurrency){
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedCurrency: action.payload
    });
  }

}
