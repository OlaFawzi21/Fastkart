import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { VerifyEmailOtp, VerifyNumberOTP } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { AuthNumberLoginState } from '../../../shared/interface/auth.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
  selector: "app-otp",
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    AlertComponent,
    ButtonComponent,
  ],
  templateUrl: "./otp.component.html",
  styleUrl: "./otp.component.scss",
})
export class OtpComponent {
  public form: FormGroup;
  public email: string;
  public otpType: any;
  public number: AuthNumberLoginState;

  public breadcrumb: Breadcrumb = {
    title: this.translate.instant("verification_code"),
    items: [{ label: this.translate.instant("verification_code"), active: true }],
  };

  constructor(
    public router: Router,
    public store: Store,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.form = this.formBuilder.group({
      otp: new FormControl("", [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit() {
    this.otpType = this.authService.otpType;
    if (this.otpType === "email") {
      this.email = this.store.selectSnapshot((state) => state.auth.email);
      if (!this.email) {
        this.router.navigateByUrl("/auth/login");
      }
    } else if (this.otpType === "number") {
      this.number = this.store.selectSnapshot((state) => state.auth.number);
      if (!this.number.phone) {
        this.router.navigateByUrl("/auth/login");
      }
    } else {
      this.router.navigateByUrl("/auth/login");
    }
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      var action: any;
      var value;
      if (this.otpType === "email") {
        value = {
          email: this.email,
          token: this.form.value.otp,
        };
        action = new VerifyEmailOtp(value);
      }

      if (this.otpType === "number") {
        value = {
          phone: this.number.phone,
          country_code: this.number.country_code,
          token: this.form.value.otp,
        };
        action = new VerifyNumberOTP(value);
      }

      this.store.dispatch(action).subscribe({
        complete: () => {
          if (this.otpType === "email") {
            this.router.navigateByUrl("/auth/update-password");
          } else {
            this.router.navigateByUrl("/account/dashboard");
          }
        },
      });
    }
  }
}
