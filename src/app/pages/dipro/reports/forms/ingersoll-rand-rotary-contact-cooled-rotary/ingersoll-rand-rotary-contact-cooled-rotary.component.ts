import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/database/models/customer';
import { Location } from 'src/app/database/models/location';
import { Unit } from 'src/app/database/models/unit';
import { BaseForm } from '../base-form';

@Component({
  selector: 'app-ingersoll-rand-rotary-contact-cooled-rotary',
  templateUrl: './ingersoll-rand-rotary-contact-cooled-rotary.component.html',
  styleUrls: ['./ingersoll-rand-rotary-contact-cooled-rotary.component.scss'],
})
export class IngersollRandRotaryContactCooledRotaryComponent extends BaseForm implements OnInit {
  businessUnits$: Observable<Unit[]> | null = null;
  customers$: Observable<Customer[]> | null = null;
  locations$: Observable<Location[]> | null = null;
  formGroup = new FormGroup({

  });
  ngOnInit() {}

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.onSubmit.emit(this.formGroup.value);
  }

}
