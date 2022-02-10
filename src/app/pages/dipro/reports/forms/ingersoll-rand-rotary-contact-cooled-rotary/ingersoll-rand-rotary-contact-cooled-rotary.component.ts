import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';

@Component({
  selector: 'app-ingersoll-rand-rotary-contact-cooled-rotary',
  templateUrl: './ingersoll-rand-rotary-contact-cooled-rotary.component.html',
  styleUrls: ['./ingersoll-rand-rotary-contact-cooled-rotary.component.scss'],
})
export class IngersollRandRotaryContactCooledRotaryComponent extends BaseForm implements OnInit {
  formGroup = new FormGroup({

  });
  ngOnInit() {}

}
