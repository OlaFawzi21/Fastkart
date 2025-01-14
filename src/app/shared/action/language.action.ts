import { Params } from "../interface/core.interface";
import { Language } from "../interface/language.interface";

export class GetLanguage {
    static readonly type = "[Language] Get";
    constructor(public payload?: Params) {}
}
  
export class SetDefaultLanguage {
    static readonly type = "[Language] Set";
    constructor(public language: Language) {}

}