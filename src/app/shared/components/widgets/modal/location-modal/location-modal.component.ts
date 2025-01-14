import { GoogleMap } from '@angular/google-maps';
import { Component, inject, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from '../../button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ClearZone, GetZone, SaveLocation } from '../../../../action/zone.action';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ZoneState } from '../../../../state/zone.state';

@Component({
    selector: 'app-location-modal',
    imports: [ButtonComponent, TranslatePipe, FormsModule, GoogleMap],
    templateUrl: './location-modal.component.html',
    styleUrl: './location-modal.component.scss'
})
export class LocationModalComponent {

  @ViewChild("locationModal", { static: false }) locationModal: TemplateRef<any>;
  location$: Observable<string> = inject(Store).select(ZoneState.location) as Observable<string>;

  public closeResult: string;
  public modalOpen: boolean = false;
  public term: string;
  public suggestions: any[] = [];
  public selectedPlaceId: string | null = null;
  public cityName: string | null = null;
  public openSuggestions: boolean = false;
  public show: boolean = true;
  public selectedIndex: number = -1;
  public location: string;

  constructor(private modalService: NgbModal, private http: HttpClient,
    private store: Store, private ngZone: NgZone) { }


  ngOnInit() {
    this.location$.subscribe(res => this.location = res);
    this.term = this.store.selectSnapshot(state => state.zone.location);
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.locationModal, {
      ariaLabelledBy: 'Location-Modal',
      centered: true,
      windowClass: 'theme-modal location-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onCityInput(target: any): void {
    this.term = target.value; // Update the input value
    if (this.term.length > 0) {
      this.openSuggestions = true;
      this.getSuggestions(this.term);
    } else {
      this.suggestions = []; // Clear suggestions if input is empty
    }
  }

  getSuggestions(query: string): void {
    const service = new google.maps.places.AutocompleteService();
    const request = {
      input: query,
      types: ['geocode'], // Includes all types of geographic data
    };

    service.getPlacePredictions(request, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Directly use the predictions without filtering by term or value
        this.suggestions = predictions || [];
      } else {
        console.error('Error fetching suggestions:', status);
        this.suggestions = [];
      }
    });
  }

  selectCity(city: google.maps.places.AutocompletePrediction): void {
    const placeId = city.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        this.selectedPlaceId = placeId;
        this.cityName = city.description.split(',')[0];

        if (place.geometry?.location) {
          this.ngZone.run(() => {
            this.term = String(place.formatted_address)
            this.store.dispatch(new SaveLocation(String(place.formatted_address)))
          })
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          this.store.dispatch(new GetZone({ lat: lat, lng: lng }));
          this.modalService.dismissAll();
        }
      } else {
        console.error('Failed to get place details:', status);
      }
    });

    // Clear suggestions
    this.suggestions = [];
    this.openSuggestions = false;
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results?.[0]) {
              this.ngZone.run(() => {
                this.term = results[0].formatted_address
                this.store.dispatch(new SaveLocation(results[0].formatted_address))
                this.modalService.dismissAll();
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

  clearZone(){
    this.store.dispatch(new ClearZone());
    this.term = '';
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
