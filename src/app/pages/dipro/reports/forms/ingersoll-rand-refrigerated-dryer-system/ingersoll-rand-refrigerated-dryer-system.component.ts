import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';

@Component({
  selector: 'app-ingersoll-rand-refrigerated-dryer-system',
  templateUrl: './ingersoll-rand-refrigerated-dryer-system.component.html',
  styleUrls: ['./ingersoll-rand-refrigerated-dryer-system.component.scss'],
})
export class IngersollRandRefrigeratedDryerSystemComponent extends BaseForm implements OnInit {
  formGroup = new FormGroup({

  });
  ngOnInit() {}

}
