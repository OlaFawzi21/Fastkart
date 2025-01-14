import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { OrderTracking } from '../../../shared/action/order.action';
import { GetOrderStatus } from '../../../shared/action/order-status.action';
import { OrderState } from '../../../shared/state/order.state';
import { OrderStatusState } from '../../../shared/state/order-status.state';
import { Order } from '../../../shared/interface/order.interface';
import { OrderStatusModel } from '../../../shared/interface/order-status.interface';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { CountryState } from '../../../shared/state/country.state';
import { StateState } from '../../../shared/state/state.state';
import { Country, CountryModel } from '../../../shared/interface/country.interface';
import { States, StatesModel } from '../../../shared/interface/state.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-order-details',
    imports: [CommonModule, TranslateModule, CurrencySymbolPipe,
        RouterModule, BreadcrumbComponent, NoDataComponent
    ],
    templateUrl: './order-details.component.html',
    styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {

  orderStatus$: Observable<OrderStatusModel> = inject(Store).select(OrderStatusState.orderStatus);
  country$: Observable<{ data: Country[] }> = inject(Store).select(CountryState.country);
  state$: Observable<{ data: States[] }> = inject(Store).select(StateState.state);

  private destroy$ = new Subject<void>();

  public order: Order | null;
  public email_or_phone: string;
  public countries: Country[] = [];
  public states: States[] = [];

  public breadcrumb: Breadcrumb = {
    title: "Order Details",
    items: [{ label: 'Order Details', active: false }]
  };

  constructor(private store: Store,
    private route: ActivatedRoute) {
    this.store.dispatch(new GetOrderStatus());
    this.country$.subscribe(country => this.countries = country.data);
    this.state$.subscribe(state => this.states = state.data);
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap(params => {
            this.email_or_phone = params['email_or_phone'];
            return this.store
                      .dispatch(new OrderTracking({ order_number: params['order_number'].toString(), email_or_phone: params['email_or_phone']}))
                      .pipe(mergeMap(() => this.store.select(OrderState.selectedOrder)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(order => {
        this.order = order;
        this.order && (this.order.consumer = order?.guest_order ? order?.guest_order : order?.consumer);
      });
  }

  getCountryName(id: number) {
    return this.countries.find(country => country.id == id)?.name;
  }

  getStateName(id: number) {
    return this.states.find(state => state.id == id)?.name;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
