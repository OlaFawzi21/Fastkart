import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from '../interface/core.interface';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { LanguageModel } from "../interface/language.interface";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) {}
   
  getLanguage(payload?: Params): Observable<LanguageModel> {
    return this.http.get<LanguageModel>(`${environment.URL}/language`, { params: payload });
  }
  
}