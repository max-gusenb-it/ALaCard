import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Share } from '@capacitor/share';
import { ClipboardUtils } from 'projects/shared/src/lib/utils/utils/clipboard.utils';

@Component({
  selector: 'share-bottom-sheet',
  templateUrl: './share-bottom-sheet.component.html',
  styleUrls: ['./share-bottom-sheet.component.scss'],
})
export class ShareBottomSheet {

  constructor(
    @Inject(DIALOG_DATA) public data: string,
    private dialogRef: DialogRef
  ) { }

  shareLink() {
    Share.share({
      url: this.data
    }).then(() => this.close());
  }

  copyToClipboard() {
    ClipboardUtils.copyTextToClipboard(this.data).then(() => this.close());
  }

  close() {
    this.dialogRef.close();
  }

}
