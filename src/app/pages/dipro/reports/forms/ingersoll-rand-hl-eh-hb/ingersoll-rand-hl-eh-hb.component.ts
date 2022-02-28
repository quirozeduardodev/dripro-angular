import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';

@Component({
  selector: 'app-ingersoll-rand-hl-eh-hb',
  templateUrl: './ingersoll-rand-hl-eh-hb.component.html',
  styleUrls: ['./ingersoll-rand-hl-eh-hb.component.scss'],
})
export class IngersollRandHlEhHbComponent extends BaseForm implements OnInit {
  formGroup = new FormGroup({

  });
  items = Array.from({length: 1000}).map((_, i) => `Item #${i}`);
  ngOnInit() {}

}
