import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { IOptionDialogData } from 'src/app/core/models/interfaces';

@Component({
  selector: 'it-option-dialog',
  templateUrl: './it-option-dialog.component.html',
  styleUrls: ['./it-option-dialog.component.scss']
})
export class ItOptionDialog {

  constructor(
    @Inject(DIALOG_DATA) public data: IOptionDialogData,
    private dialogRef: DialogRef
  ) { }

  close(result: boolean = false) {
    this.dialogRef.close(result);
  }
}
