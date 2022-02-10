import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';

@Component({
  selector: 'app-ingersoll-rand-rotary-contact-cooled-nirvana',
  templateUrl: './ingersoll-rand-rotary-contact-cooled-nirvana.component.html',
  styleUrls: ['./ingersoll-rand-rotary-contact-cooled-nirvana.component.scss'],
})
export class IngersollRandRotaryContactCooledNirvanaComponent extends BaseForm implements OnInit {
  formGroup = new FormGroup({

  });
  ngOnInit() {}

}
