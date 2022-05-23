import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseDialogComponent} from '../../../../../components/dialogs/base-dialog/base-dialog.component';

@Component({
  selector: 'app-process-status-dialog',
  templateUrl: './process-status-dialog.component.html',
  styleUrls: ['./process-status-dialog.component.scss'],
})
export class ProcessStatusDialogComponent implements OnInit, OnChanges {

  @ViewChild('dialogBase') dialogBase: BaseDialogComponent | null = null;
  @Input() status: ProcessStatus = 'idle';
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.status.currentValue !== changes.status.previousValue) {
      if(changes.status.currentValue === 'idle') {
        this.dialogBase?.close();
      } else {
        this.dialogBase?.open();
      }
    }
  }

}

export type ProcessStatus = 'idle' | 'sending' | 'success' | 'error' | 'unknownEmail';
