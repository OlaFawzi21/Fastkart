import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { Cart, CartAddOrUpdate, CartModel } from "../interface/cart.interface";
import { Store } from "@ngxs/store";

@Injectable({
  providedIn: "root",
})
export class CartService {
  
  private subjectQty = new Subject<boolean>();

  constructor(private http: HttpClient, private store: Store) {}

  getCartItems(): Observable<CartModel> {
    return this.http.get<CartModel>(`${environment.URL}/cart`);
  }

  addToCart(payload: CartAddOrUpdate): Observable<CartModel> {
    const is_zone = this.store.selectSnapshot(state => state?.setting?.setting?.activation?.zone_enable);
    const zone = this.store.selectSnapshot(state => state.zone.selectedZone);
    const updatedPayload = {
        ...payload,
        ...(is_zone && { zone_ids: zone.join() }) // Include zone_ids only if is_zone is true
    };
    return this.http.post<CartModel>(`${environment.URL}/cart`, updatedPayload);
  }

  updateQty() {
    this.subjectQty.next(true);
  }

  getUpdateQtyClickEvent(): Observable<boolean>{ 
    return this.subjectQty.asObservable();
  }

  updateCart(payload: CartAddOrUpdate): Observable<CartModel> {
    const is_zone = this.store.selectSnapshot(state => state?.setting?.setting?.activation?.zone_enable);
    const zone = this.store.selectSnapshot(state => state.zone.selectedZone);
    const updatedPayload = {
        ...payload,
        ...(is_zone && { zone_ids: zone.join() }) // Include zone_ids only if is_zone is true
    };
    return this.http.put<CartModel>(`${environment.URL}/cart`, updatedPayload);
  }

  replaceCart(payload: CartAddOrUpdate): Observable<CartModel> {
    return this.http.put<CartModel>(`${environment.URL}/replace/cart`, payload);
  }

  deleteCart(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/cart/${id}`);
  }

  clearCart() {
    return this.http.delete<number>(`${environment.URL}/clear/cart`);
  } 

  syncCart(payload: CartAddOrUpdate[]): Observable<CartModel> {
    return this.http.post<CartModel>(`${environment.URL}/sync/cart`, payload);
  }

}
