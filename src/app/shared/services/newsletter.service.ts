import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingState } from '../state/setting.state';
import { Values } from '../interface/setting.interface';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;

  private listId: string;
  private apiKey: string;

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  subscribe(email: string) {

    this.setting$.subscribe(setting =>  {
      this.listId = setting?.newsletter?.mailchip_list_id;
      this.apiKey = setting?.newsletter?.mailchip_api_key;
    });

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', `Bearer ` + this.apiKey);
    headers = headers.append('Access-Control-Allow-Origin', '*');

    const url = `https://us21.api.mailchimp.com/3.0/lists/${this.listId}/members`;

    const body = JSON.stringify({
      email_address: email,
      status: 'subscribed',
    });

    return this.http.post(url, body, { headers: headers }).subscribe({
      next: (res) => {
        this.notificationService.showSuccess("Subscribed Successfully");
      },
      error: (error) => {
        return error;
      }
    });
  }

}
