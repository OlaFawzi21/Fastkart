import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { Login } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { AuthService } from '../../../shared/services/auth.service';
import { CartState } from '../../../shared/state/cart.state';
import { GetCartItems, SyncCart } from '../../../shared/action/cart.action';
import { Values } from '../../../shared/interface/setting.interface';
import { SettingState } from '../../../shared/state/setting.state';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
  selector: "app-login",
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbComponent,
    AlertComponent,
    ButtonComponent,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  cartItem$: Observable<Cart[]> = inject(Store).select(
    CartState.cartItems
  ) as Observable<Cart[]>;
  setting$: Observable<Values> = inject(Store).select(
    SettingState.setting
  ) as Observable<Values>;

  public form: FormGroup;
  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("log_in"),
    items: [{ label: this.translate.instant("log_in"), active: true }],
  };
  public reCaptcha: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      recaptcha: new FormControl(null, Validators.required),
    });
    this.setting$.subscribe((setting) => {
      if (
        (setting?.google_reCaptcha && !setting?.google_reCaptcha?.status) ||
        !setting?.google_reCaptcha
      ) {
        this.form.removeControl("recaptcha");
        this.reCaptcha = false;
      } else {
        this.form.setControl(
          "recaptcha",
          new FormControl(null, Validators.required)
        );
        this.reCaptcha = true;
      }
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(new Login(this.form.value)).subscribe({
        complete: () => {
          // Sync Cart Storage when successfully Login
          let syncCartItems: CartAddOrUpdate[] = [];
          this.cartItem$.subscribe((items) => {
            items.filter((item) => {
              if (item) {
                const params: CartAddOrUpdate = {
                  id: null,
                  product: item?.product,
                  product_id: item?.product_id,
                  variation: item?.variation ? item.variation : null,
                  variation_id: item?.variation_id ? item.variation_id : null,
                  quantity: item.quantity,
                };
                syncCartItems.push(params);
              }
            });
          });
          if (syncCartItems.length) {
            this.store.dispatch(new SyncCart(syncCartItems));
          } else {
            this.store.dispatch(new GetCartItems());
          }
          // Navigate to the intended URL after successful login
          const redirectUrl =
            this.authService.redirectUrl || "/account/dashboard";
          this.router.navigateByUrl(redirectUrl);

          // Clear the stored redirect URL
          this.authService.redirectUrl = undefined;
        },
      });
    }
  }
}
