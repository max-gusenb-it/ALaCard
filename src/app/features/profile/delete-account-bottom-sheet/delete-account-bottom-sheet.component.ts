import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { interval, Observable, take } from 'rxjs';
import { User } from 'src/app/core/models/interfaces';
import { AuthenticationState } from 'src/app/core/state';

const secondsUntilDeleteEnabled = 5;

@Component({
  selector: 'app-delete-account-bottom-sheet',
  templateUrl: './delete-account-bottom-sheet.component.html',
  styleUrls: ['./delete-account-bottom-sheet.component.scss'],
})
export class DeleteAccountBottomSheetComponent {
  @Select(AuthenticationState.user) user$!: Observable<User>;

  countDown: number = secondsUntilDeleteEnabled;
  confirmDisabled: boolean = true;

  constructor(private dialogRef: DialogRef) {
    interval(1000)
      .pipe(take(secondsUntilDeleteEnabled))
      .subscribe(() => {
        this.countDown -= 1;
        if (this.countDown === 0) {
          this.confirmDisabled = false
        }
    });
  }

  close(deleteAccount: boolean = false) {
    this.dialogRef.close(deleteAccount);
  }
}
