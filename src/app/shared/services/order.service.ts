import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CheckoutPayload, Order, OrderModel, OrderCheckout, PlaceOrder, RePaymentPayload } from '../interface/order.interface';
import { Params } from '../interface/core.interface';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient, private store: Store) {}

  getOrders(payload?: Params): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${environment.URL}/order`, { params: payload });
  }

  viewOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.URL}/order/${id}`);
  }

  checkout(payload: CheckoutPayload): Observable<OrderCheckout> {
    const is_zone = this.store.selectSnapshot(state => state?.setting?.setting?.activation?.zone_enable);
    const zone = this.store.selectSnapshot(state => state.zone.selectedZone);
    const updatedPayload = {
        ...payload,
        ...(is_zone && { zone_ids: zone.join() }) // Include zone_ids only if is_zone is true
    };
    return this.http.post<OrderCheckout>(`${environment.URL}/checkout`, updatedPayload);
  }

  placeOrder(payload: CheckoutPayload): Observable<PlaceOrder> {
    const is_zone = this.store.selectSnapshot(state => state?.setting?.setting?.activation?.zone_enable);
    const zone = this.store.selectSnapshot(state => state.zone.selectedZone);
    const updatedPayload = {
      ...payload,
      ...(is_zone && { zone_ids: zone.join() }) // Include zone_ids only if is_zone is true
    };
    return this.http.post<PlaceOrder>(`${environment.URL}/order`, updatedPayload);
  }

  rePayment(payload: RePaymentPayload): Observable<PlaceOrder> {
    return this.http.post<PlaceOrder>(`${environment.URL}/rePayment`, payload);
  }

  orderTracking(payload: { order_number: string, email_or_phone: string }): Observable<Order> {
    return this.http.get<Order>(`${environment.URL}/trackOrder`, { params: payload });
  }

  downloadInvoice(payload?: Params): Observable<Blob> {
    const requestBody = {}; // You can provide any necessary request body here
    return this.http.post<Blob>(`${environment.URL}/order/invoice`, payload , {
      responseType: 'blob' as 'json'
    });
  }

}
