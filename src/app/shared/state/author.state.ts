import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetAuthorBySlug } from "../action/author.action";
import { NotificationService } from "../services/notification.service";
import { Author } from "../interface/author.interface";
import { AuthorService } from "../services/author.service";

export class AuthorStateModel {
  selectedAuthor: Author | null;
}

@State<AuthorStateModel>({
  name: "author",
  defaults: {
    selectedAuthor: null
  },
})
@Injectable()
export class AuthorState {
  
  constructor(
    private authorService: AuthorService) {}
  
  @Selector()
  static selectedAuthor(state: AuthorStateModel) {
    return state.selectedAuthor;
  }
  
  @Action(GetAuthorBySlug)
  edit(ctx: StateContext<AuthorStateModel>, { slug }: GetAuthorBySlug) {
    return this.authorService.getAuthorBySlug(slug).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedAuthor: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
