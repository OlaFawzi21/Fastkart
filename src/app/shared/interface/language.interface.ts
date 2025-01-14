import { PaginateModel } from "./core.interface";

export interface LanguageModel extends PaginateModel {
    data: Language[];
}

export interface Language {
    id: number;
    name: string;
    flag: string;
    locale: string;
    is_rtl: boolean;
    status: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface LanguageFiledModel extends PaginateModel {
    data: LanguageFile[];
}

export interface LanguageFile {
    [key: string]: any;
}


