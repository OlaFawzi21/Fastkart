import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MenuService } from "../services/menu.service";
import { GetMenu } from "../action/menu.action";
import { tap } from "rxjs";
import { Menu } from "../interface/menu.interface";
import { TranslateService } from "@ngx-translate/core"; // Import translate service
import { forkJoin } from "rxjs"; // Import forkJoin for waiting multiple observables

export class MenuStateModel {
  menu = {
    data: [] as Menu[],
    total: 0,
  };
}

@State<MenuStateModel>({
  name: "menu",
  defaults: {
    menu: {
      data: [],
      total: 0,
    },
  },
})
@Injectable()
export class MenuState {
  constructor(
    private menuService: MenuService,
    private translate: TranslateService
  ) {} // Inject TranslateService

  @Selector()
  static menu(state: MenuStateModel) {
    return state.menu;
  }

  @Action(GetMenu)
  getMenu(ctx: StateContext<MenuStateModel>, action: GetMenu) {
    this.menuService.skeletonLoader = true;

    // Wait for translations and menu data to be fetched before proceeding
    forkJoin([
      this.translate.get(["HOME", "BLOG", "ABOUT_US", "CONTACT_US"]), // Load translations
      this.menuService.getMenu(action.payload), // Load menu data
    ]).subscribe({
      next: ([translations, result]) => {
        console.log(result);

        // Filter out "Collections", "Mega Menu", "Product", and "Seller"
        const filteredMenus = result.data.filter(
          (menu: Menu) =>
            menu.id !== 8 &&
            menu.id !== 32 &&
            menu.id !== 40 &&
            menu.id !== 129 &&
            menu.id !== 102 // Remove "Pages" menu completely
        );

        // Extract "Pages" menu to get "About Us" and "Contact Us"
        const pagesMenu = result.data.find((menu: Menu) => menu.id === 102);
        const extractedPages = (pagesMenu?.child || []).filter((item) =>
          ["About Us", "Contact Us"].includes(item.title)
        );

        const newTopLevelMenus = extractedPages.map((item) => {
          // Translate based on the title directly
          let translatedTitle = item.title;
          // Match translation keys based on title
          if (item.title === "About Us") {
            translatedTitle = translations["ABOUT_US"];
          } else if (item.title === "Contact Us") {
            translatedTitle = translations["CONTACT_US"];
          }

          return {
            ...item,
            title: translatedTitle, // Use translated title if available
            link_type: "link", // Ensure it's treated as a link
            parent_id: null, // Remove parent relationship
          };
        });

        // Update "Home" and "Blog" in the filtered menu
        const updatedMenus = filteredMenus.map((menu: Menu) => {
          if (menu.id === 3) {
            return {
              ...menu,
              title: translations["HOME"], // Translate "Home"
              path: "/home", // Update the path to the home route
              is_target_blank: 0, // Make it not open in a new tab
              link_type: "link", // Treat it like a link
              child: [], // No child menu for "Home"
            };
          }

          if (menu.id === 96) {
            return {
              ...menu,
              title: translations["BLOG"], // Translate "Blog"
              path: "blogs", // Navigate to Grid No Sidebar
              is_target_blank: 0, // Do not open in a new tab
              link_type: "link", // Treat it as a normal link
              child: [], // Remove child items
            };
          }

          return menu;
        });

        // Combine updated menus with extracted "About Us" and "Contact Us"
        const finalMenu = [...updatedMenus, ...newTopLevelMenus];

        // Update state with transformed data
        ctx.patchState({
          menu: {
            data: finalMenu,
            total: finalMenu.length,
          },
        });
      },
      error: (err) => {
        this.menuService.skeletonLoader = false;
        throw new Error(err?.error?.message || "Failed to fetch menu");
      },
      complete: () => {
        this.menuService.skeletonLoader = false;
      },
    });
  }
}
