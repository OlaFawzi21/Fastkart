import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MenuService } from "../services/menu.service";
import { GetMenu } from "../action/menu.action";
import { tap } from "rxjs";
import { Menu } from "../interface/menu.interface";

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
  constructor(private menuService: MenuService) {}

  @Selector()
  static menu(state: MenuStateModel) {
    return state.menu;
  }
  @Action(GetMenu)
  getMenu(ctx: StateContext<MenuStateModel>, action: GetMenu) {
    this.menuService.skeletonLoader = true;

    return this.menuService.getMenu(action.payload).pipe(
      tap({
        next: (result) => {
          // Filter out "Collections", "Mega Menu", "Product", and "Seller"
          const filteredMenus = result.data.filter(
            (menu: Menu) =>
              menu.title !== "Collections" &&
              menu.title !== "Mega Menu" &&
              menu.title !== "Product" &&
              menu.title !== "Seller" &&
              menu.title !== "Pages" // Remove "Pages" menu completely
          );

          // Extract "Pages" menu to get "About Us" and "Contact Us"
          const pagesMenu = result.data.find(
            (menu: Menu) => menu.title === "Pages"
          );
          const extractedPages = (pagesMenu?.child || []).filter((item) =>
            ["About Us", "Contact Us"].includes(item.title)
          );

          // Transform extracted items into top-level menu items
          const newTopLevelMenus = extractedPages.map((item) => ({
            ...item,
            link_type: "link", // Ensure they are treated as links
            parent_id: null, // Remove parent relationship
          }));

          // Update "Home" and "Blog" in the filtered menu
          const updatedMenus = filteredMenus.map((menu: Menu) => {
            if (menu.title === "Home") {
              return {
                ...menu,
                title: "Home",
                path: "/home", // Update the path to the home route
                is_target_blank: 0, // Make it not open in a new tab
                link_type: "link", // Treat it like a link
                child: [], // No child menu for "Home"
              };
            }

            if (menu.title === "Blog") {
              return {
                ...menu,
                title: "Blog",
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
      })
    );
  }
}
