import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-center-loading',
  templateUrl: './center-loading.component.html',
  styleUrls: ['./center-loading.component.scss'],
})
export class CenterLoadingComponent implements OnInit {

  @Input() stopPropagation: boolean = true;

  constructor() { }

  ngOnInit() {}

}
