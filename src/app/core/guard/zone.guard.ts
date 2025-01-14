import { Injectable } from '@angular/core';
import { Event, Scroll, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { IsSelectedZone } from '../../shared/action/zone.action';

@Injectable({
  providedIn: 'root',
})
export class ZoneGuard   {

    constructor(private store: Store,
        private router: Router) {}
    
      canActivate(
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
        // // Store the attempted URL for redirecting after login
        if(!this.store.selectSnapshot(state => state.zone && state.zone.isZoneSelected)) {
        //     return this.router.createUrlTree(['/']);
            this.store.dispatch(new IsSelectedZone())
        }
        
        return true;
      }
}
