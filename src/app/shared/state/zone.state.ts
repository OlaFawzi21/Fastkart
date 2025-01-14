import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { Tag } from "../interface/tag.interface";
import { ClearZone, GetZone, IsSelectedZone, SaveLocation } from "../action/zone.action";
import { ZoneService } from "../services/zone.service";
import { ClearCart } from "../action/cart.action";

export class ZoneStateModel {
  zone = {
    data: [] as Tag[],
    total: 0
  }
  selectedZone: number[]
  location: string;
  isZoneSelected: boolean
}

@State<ZoneStateModel>({
  name: "zone",
  defaults: {
    zone: {
      data: [],
      total: 0
    },
    selectedZone: [],
    location: '',
    isZoneSelected: false
  }
})
@Injectable()
export class ZoneState {
  
  constructor(private zoneService: ZoneService, private store: Store) {}

  @Selector()
  static zone(state: ZoneStateModel) {
    return state.zone;
  }

  @Selector()
  static location(state: ZoneStateModel) {
    return state.location;
  }

  @Selector()
  static selectedZone(state: ZoneStateModel) {
    return state.selectedZone;
  }


  @Selector()
  static isZoneSelected(state: ZoneStateModel) {
    return state.isZoneSelected;
  }

  @Action(GetZone)
  getZone(ctx: StateContext<ZoneStateModel>, action: GetZone) {
    return this.zoneService.getZone(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            selectedZone: result.length ? result.map((item: {id: number, name: string}) => item.id) : [],
            isZoneSelected: true
          });
          this.store.dispatch(new ClearCart());
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
 
  @Action(SaveLocation)
  saveAddress(ctx: StateContext<ZoneStateModel>, action: SaveLocation) {
    ctx.patchState({
      location: action.location
    });
  }

  
  @Action(ClearZone)
  clearZone(ctx: StateContext<ZoneStateModel>) {
    ctx.patchState({
      location: '',
      selectedZone: [],
      isZoneSelected: false
    });
  }

  @Action(IsSelectedZone)
  isZoneSelected(ctx: StateContext<ZoneStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      // isZoneSelected: !state.selectedZone.length
    })
  }
}