import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { Share } from '@capacitor/share';

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
    Share.share({
      url: this.data
    }).then(() => this.close());
  }

  close() {
    this.dialogRef.close();
  }

}
