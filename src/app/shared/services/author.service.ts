import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Params } from "../interface/core.interface";
import { Author, AuthorModel } from "../interface/author.interface";

@Injectable({
  providedIn: "root",
})
export class AuthorService {

  constructor(private http: HttpClient) {}

  getAuthorBySlug(slug: string): Observable<Author> {
      return this.http.get<Author>(`${environment.URL}/author/slug/${slug}`);
  }

}
