import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService, ResetPasswordEvent} from "../../../services/auth.service";
import {ProcessStatus} from "./components/process-status-dialog/process-status-dialog.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  formGroupResetPassword: FormGroup;

  status$: BehaviorSubject<ProcessStatus> = new BehaviorSubject<ProcessStatus>('idle');
  constructor(private router: Router, private authService: AuthService) {
    this.formGroupResetPassword = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {}

  submit(): void {
    this.formGroupResetPassword.markAllAsTouched();
    if(this.formGroupResetPassword.valid) {
      this.status$.next('idle');
      this.authService.recoveryPassword(this.formGroupResetPassword.value).subscribe(value => {
        switch (value) {
          case ResetPasswordEvent.sending:
            this.status$.next('sending');
            break;
          case ResetPasswordEvent.success:
            this.status$.next('success');
            break;
          case ResetPasswordEvent.error:
            this.status$.next('error');
            break;
          case ResetPasswordEvent.invalidEmail:
            this.status$.next('unknownEmail');
            break;
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login'], {replaceUrl: true});
  }

  ngOnDestroy(): void {
    this.status$.complete();
  }
}
