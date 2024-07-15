import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrls: ['./leave-dialog.component.scss']
})
export class LeaveDialogComponent {

  constructor(public dialogRef: DialogRef) { }

  close(leaveRoom: boolean = false) {
    this.dialogRef.close({
      leaveRoom: leaveRoom
    });
  }

}
