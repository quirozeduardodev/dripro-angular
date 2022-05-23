import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, LoginEvent} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {OfflineDataService} from '../../../services/offline-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formGroupLogin: FormGroup;
  isVisiblePassword = false;
  isLogging = false;
  isInvalidCredentials = false;
  constructor(private authService: AuthService, private router: Router, private offlineDataService: OfflineDataService) {
    this.formGroupLogin = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  submit(): void {
    if (this.isLogging) {
      return;
    }
    this.formGroupLogin.markAllAsTouched();
    if(this.formGroupLogin.valid) {
      this.isLogging = true;
      this.isInvalidCredentials = false;
      this.formGroupLogin.disable();
      this.authService.login({
        email: this.formGroupLogin.controls.username.value,
        password: this.formGroupLogin.controls.password.value,
      }).subscribe(loginEvent => {
        if (loginEvent === LoginEvent.success) {
          this.offlineDataService.synchronizeAll();
          this.router.navigate(['/'], {replaceUrl: true});
        } else if (loginEvent === LoginEvent.invalidCredentials) {
          this.isInvalidCredentials = true;
        } else if (loginEvent === LoginEvent.serverError) {

        } else if (loginEvent === LoginEvent.unknownError) {

        }

        if(loginEvent !== LoginEvent.success) {
          this.isLogging = false;
          this.formGroupLogin.enable();
        }
      });
    }
  }

  goToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password'], {replaceUrl: true});
  }
}
