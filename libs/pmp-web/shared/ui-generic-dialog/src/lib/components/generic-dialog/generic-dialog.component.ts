import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericDialogPayload } from '@pimp-my-pr/pmp-web/shared/domain';

@Component({
  selector: 'pimp-my-pr-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent {
  message: string;
  noOptionMsg: string;
  yesOptionMsg: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: GenericDialogPayload) {
    this.message = data && data.message ? data.message : 'Are you sure?';
    this.noOptionMsg = data && data.noOptionMsg ? data.noOptionMsg : 'Cancel';
    this.yesOptionMsg = data && data.yesOptionMsg ? data.yesOptionMsg : 'Yes';
  }
}
