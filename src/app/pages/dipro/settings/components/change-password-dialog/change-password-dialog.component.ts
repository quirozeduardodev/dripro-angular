import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {BaseDialogComponent} from "../../../../../components/dialogs/base-dialog/base-dialog.component";
import {AuthService, ChangePasswordEvent} from "../../../../../services/auth.service";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {

  @ViewChild('baseDialog') baseDialog: BaseDialogComponent | null = null;
  formControlPassword: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  state: 'idle' | 'changing' | 'error' | 'success' = "idle";
  constructor(private authService: AuthService) { }

  ngOnInit() {}

  submit(): void {
    this.formControlPassword.markAsTouched();
    if (!this.formControlPassword.valid) {
      return;
    }
    const password: string = this.formControlPassword.value;
    this.authService.changePassword(password).subscribe(result => {
      switch (result) {
        case ChangePasswordEvent.changing:
          this.state = 'changing';
          break;
        case ChangePasswordEvent.error:
          this.state = 'error';
          break;
        case ChangePasswordEvent.success:
          this.state = 'success';
          break;
      }
    });
  }

  open(): void {
    this.state = 'idle';
    this.formControlPassword.reset('');
    this.baseDialog?.open();
  }

  close(): void {
    this.baseDialog?.close();
  }

}
