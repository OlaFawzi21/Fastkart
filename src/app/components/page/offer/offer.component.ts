import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { GetCoupons } from "../../../shared/action/coupon.action";
import { BreadcrumbComponent } from "../../../shared/components/widgets/breadcrumb/breadcrumb.component";
import { NoDataComponent } from "../../../shared/components/widgets/no-data/no-data.component";
import { Breadcrumb } from "../../../shared/interface/breadcrumb";
import { CouponModel } from "../../../shared/interface/coupon.interface";
import { CouponState } from "../../../shared/state/coupon.state";
import { CouponService } from "./../../../shared/services/coupon.service";

@Component({
  selector: "app-offer",
  imports: [
    CommonModule,
    TranslateModule,
    BreadcrumbComponent,
    NoDataComponent,
  ],
  templateUrl: "./offer.component.html",
  styleUrl: "./offer.component.scss",
})
export class OfferComponent {
  public skeletonItems = Array.from({ length: 8 }, (_, index) => index);
  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("offer"),
    items: [{ label: this.translate.instant("offer"), active: true }],
  };

  coupon$: Observable<CouponModel> = inject(Store).select(CouponState.coupon);

  constructor(
    private store: Store,
    public couponService: CouponService,
    private translate: TranslateService
  ) {
    this.store.dispatch(new GetCoupons({ status: 1 }));
  }

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
  }
}
