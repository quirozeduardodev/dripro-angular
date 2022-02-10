import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-process-status-dialog',
  templateUrl: './process-status-dialog.component.html',
  styleUrls: ['./process-status-dialog.component.scss'],
})
export class ProcessStatusDialogComponent implements OnInit {

  @Input() status: ProcessStatus = 'idle';
  constructor() { }

  ngOnInit() {}

}

export type ProcessStatus = 'idle' | 'sending' | 'success' | 'error' | 'unknownEmail';
