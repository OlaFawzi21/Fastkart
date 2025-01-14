import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Language } from "../interface/language.interface";
import { GetLanguage, SetDefaultLanguage } from "../action/language.action";
import { LanguageService } from "../services/language.service";

export class LanguageStateModel {
  language = {
    data: [] as Language[],
    total: 0
  }
  defaultLanguage: Language | null
}

@State<LanguageStateModel>({
  name: "language",
  defaults: {
    language: {
      data: [],
      total: 0
    },
    defaultLanguage: null
  },
})
@Injectable()
export class LanguageState {

    constructor(private languageService: LanguageService) {}

    @Selector()
    static language(state: LanguageStateModel) {
        return state.language;
    }

    @Selector()
    static defaultLanguage(state: LanguageStateModel) {
        return state.defaultLanguage;
    }

    @Action(GetLanguage)
    getLanguages(ctx: StateContext<LanguageStateModel>, action: GetLanguage) {
        return this.languageService.getLanguage(action.payload).pipe(
        tap({
            next: result => {
            ctx.patchState({
                language: {
                data: result.data,
                total: result?.total ? result?.total : result.data?.length
                }
            });
            },
            error: err => {
            throw new Error(err?.error?.message);
            }
        })
        );
    }

    @Action(SetDefaultLanguage)
    setDefaultLanguage(ctx: StateContext<LanguageStateModel>, { language }: SetDefaultLanguage) {
        ctx.patchState({
            defaultLanguage: language
        });
    }

}
