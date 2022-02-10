import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-warn-message',
  templateUrl: './warn-message.component.html',
  styleUrls: ['./warn-message.component.scss'],
})
export class WarnMessageComponent implements OnInit {
  @Input() message: string | null = null;
  constructor() { }

  ngOnInit() {}

}
