import { Component, inject, NgZone, ViewChild } from '@angular/core';
import { LocationModalComponent } from '../../../widgets/modal/location-modal/location-modal.component';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { GetZone, SaveLocation } from '../../../../action/zone.action';
import { Observable } from 'rxjs';
import { ZoneState } from '../../../../state/zone.state';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Values } from '../../../../interface/setting.interface';
import { SettingState } from '../../../../state/setting.state';

@Component({
    selector: 'app-location',
    imports: [CommonModule, TranslateModule, ButtonComponent, LocationModalComponent, AsyncPipe, ButtonComponent],
    templateUrl: './location.component.html',
    styleUrl: './location.component.scss'
})
export class LocationComponent {

  @ViewChild("locationModal") LocationModal: LocationModalComponent;
  
  location$: Observable<string> = inject(Store).select(ZoneState.location) as Observable<string>;
  selectedZone$: Observable<boolean> = inject(Store).select(ZoneState.isZoneSelected) as Observable<boolean>;
  setting$: Observable<Values | null> = inject(Store).select(SettingState.setting) as Observable<Values | null>;

  public is_loading: boolean = false;
  public is_zone: boolean;
  public is_zone_selected: boolean = true;
  public zone_toggle: boolean = false;

  constructor(private store: Store, private ngZone: NgZone) {}

  ngOnInit() {
    this.setting$.subscribe(value => this.is_zone = Boolean(value?.activation?.zone_enable))
    this.selectedZone$.subscribe(isZoneSelected => {
      this.is_zone_selected = isZoneSelected
      this.zone_toggle = !isZoneSelected
    })
  }

  getCurrentLocation(): void {
      if (navigator.geolocation) {
        this.ngZone.run(() => {
          this.is_loading = true;
        })
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
  
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === "OK" && results?.[0]) {
                this.ngZone.run(() => {
                  this.store.dispatch(new SaveLocation(results[0].formatted_address))
                  this.is_loading = false;
                  this.zone_toggle = false
                  this.is_zone_selected = false
                  this.store.dispatch(new GetZone({ lat: position.coords.latitude, lng: position.coords.longitude }));
                })
              } else {
                console.error("Geocoding failed: ", status);
              }
            });
          },
          (error) => {
            console.error("Error getting current location:", error);
            alert("Unable to fetch your current location. Please try again.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    }
}
