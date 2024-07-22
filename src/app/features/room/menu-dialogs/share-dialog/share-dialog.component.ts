import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
})
export class ShareDialogComponent {


  constructor(
    @Inject(DIALOG_DATA) public data: string,
    private dialogRef: DialogRef
  ) { }

  shareLink() {
    
  }

  close() {
    console.log(this.data)
    this.dialogRef.close();
  }

}
