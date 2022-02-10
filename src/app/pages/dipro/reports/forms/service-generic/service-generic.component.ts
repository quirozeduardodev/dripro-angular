import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from '../base-form';

@Component({
  selector: 'app-service-generic',
  templateUrl: './service-generic.component.html',
  styleUrls: ['./service-generic.component.scss'],
})
export class ServiceGenericComponent extends BaseForm implements OnInit {
  formGroup = new FormGroup({

  });
  ngOnInit() {}

}
