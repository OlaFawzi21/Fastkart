import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ThemeState } from "../../shared/state/theme.state";
import { GetHomePage } from "../../shared/action/theme.action";
import { ThemeOptionService } from "../../shared/services/theme-option.service";
import { RomeComponent } from "./rome/rome.component";

@Component({
  selector: "app-themes",
  imports: [
    RomeComponent,
  ],
  templateUrl: "./themes.component.html",
  styleUrl: "./themes.component.scss",
})
export class ThemesComponent {
  homePage$: Observable<object | null> = inject(Store).select(
    ThemeState.homePage
  ) as Observable<object | null>;
  activeTheme$: Observable<string> = inject(Store).select(
    ThemeState.activeTheme
  ) as Observable<string>;

  public theme: string;
  public homePage: any;

  constructor(
    private store: Store,
    private themeOptionService: ThemeOptionService
  ) {
    this.themeOptionService.preloader = true;
    this.activeTheme$.subscribe((theme) => {
      this.theme = "rome"; // Use 'rome' as the default theme
      if (this.theme) {
        this.store
          .dispatch(new GetHomePage(this.theme))
          .subscribe((data: any) => {
            this.homePage = data.theme.homePage;
            this.themeOptionService.preloader = false;
          });
      }
    });
  }

  ngOnDestroy() {
    document.body.classList.remove("home");
  }
}
