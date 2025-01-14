import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  public skeletonLoader: boolean = false;
  private geocodeAPI = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  getZone(payload: Params): Observable<any> {
    return this.http.get<any>(`${environment.URL}/zone-by-point`, { params: payload });
  }

  getCurrentLocation(): Observable<{ latitude: number; longitude: number }> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.ngZone.run(() => {
              observer.next({ latitude, longitude });
              observer.complete();
            });
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }


  getPlaceName(lat: number, lng: number): Observable<string> {
    const url = `${this.geocodeAPI}?latlng=${lat},${lng}&key=${'YOUR_GOOGLE_MAP_API_KEY'}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response.status === 'OK' && response.results.length > 0) {
          return response.results[0].formatted_address;
        } else {
          throw new Error('No results found for the given coordinates.');
        }
      }),
      catchError((error) => {
        console.error('Error fetching place name:', error.message);
        return throwError(() => new Error('Unable to fetch the place name. Please try again.'));
      })
    );
  }
  
}
