import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Publication, PublicationModel } from "../interface/publication.interface";

@Injectable({
  providedIn: "root",
})
export class PublicationService {

  constructor(private http: HttpClient) {}

  getPublicationBySlug(slug: string): Observable<Publication> {
    return this.http.get<Publication>(`${environment.URL}/publication/slug/${slug}`);
  }
 

}
