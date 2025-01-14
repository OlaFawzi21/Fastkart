import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Publication } from "../interface/publication.interface";
import { PublicationService } from "../services/publication.service";
import { GetPublicationBySlug } from "../action/publication.action";

export class PublicationStateModel {
  publication = {
    data: [] as Publication[],
    total: 0
  }
  selectedPublication: Publication | null;
}

@State<PublicationStateModel>({
  name: "publication",
  defaults: {
    publication: {
      data: [],
      total: 0
    },
    selectedPublication: null
  },
})
@Injectable()
export class PublicationState {
  
  constructor(private publicationService: PublicationService) {}
  
  @Selector()
  static selectedPublication(state: PublicationStateModel) {
    return state.selectedPublication;
  }
  
  @Action(GetPublicationBySlug)
  getPublicationBySlug(ctx: StateContext<PublicationStateModel>, { slug }: GetPublicationBySlug) {
    return this.publicationService.getPublicationBySlug(slug).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            selectedPublication: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
}
