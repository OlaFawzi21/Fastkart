import { TranslateLoader } from "@ngx-translate/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TranslationLoader implements TranslateLoader {
  public lang: string;

  constructor(private http: HttpClient) {
    // Get language from localStorage if available, otherwise default to 'ar'
    const storedLang = localStorage.getItem("defaultLanguage");
    this.lang = storedLang ? JSON.parse(storedLang).locale : "ar";

    console.log("Initialized language from localStorage:", this.lang);
  }

  getTranslation(): Observable<any> {
    const headers = new HttpHeaders({
      "Accept-Lang": this.lang,
    });

    console.log("Headers:", headers);
    console.log("Lang:", this.lang);

    return this.http.get<any>(`${environment.URL}/translation/front`, {
      headers,
    });
  }
}
