import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../state/setting.state';
import { Values } from '../interface/setting.interface';

@Injectable({
  providedIn: 'root' // or use providedIn: AppModule if only needed in AppModule
})

export class TranslationLoader implements TranslateLoader {


  public lang: string;

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;


  constructor(private http: HttpClient) {
    this.setting$.subscribe(res => {
      if(res) {
        this.lang = res?.general?.default_language?.locale;
      }
    })
  }


  getTranslation(): Observable<any> {

    // Create headers
    const headers = new HttpHeaders({
      'Accept-Lang': this.lang ? this.lang : 'en',
    });
    console.log("headers", headers);

    // Pass headers in the HTTP GET request
    return this.http.get<any>(`${environment.URL}/translation/front`, { headers });
  }

}
