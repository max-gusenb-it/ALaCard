import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { OptionBottomSheetData } from '@shared';

@Component({
  selector: 'it-option-bottom-sheet',
  templateUrl: './it-option-bottom-sheet.component.html',
  styleUrls: ['./it-option-bottom-sheet.component.scss']
})
export class ItOptionBottomSheet {

  constructor(
    @Inject(DIALOG_DATA) public data: OptionBottomSheetData,
    private dialogRef: DialogRef
  ) { }

  close(result: boolean = false) {
    this.dialogRef.close(result);
  }
}
