import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'form-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {

  @Input() value: any;
  @Input() label: string = '';

  constructor() {}

  ngOnInit() {}

}
