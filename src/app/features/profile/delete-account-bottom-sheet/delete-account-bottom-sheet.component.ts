import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, take, timer } from 'rxjs';
import { User } from 'src/app/core/models/interfaces';
import { AuthenticationState } from 'src/app/core/state';

@Component({
  selector: 'app-delete-account-bottom-sheet',
  templateUrl: './delete-account-bottom-sheet.component.html',
  styleUrls: ['./delete-account-bottom-sheet.component.scss'],
})
export class DeleteAccountBottomSheetComponent {
  @Select(AuthenticationState.user) user$!: Observable<User>;

  confirmDisabled: boolean = true;

  constructor(private dialogRef: DialogRef) {
    timer(5000)
      .pipe(take(1))
      .subscribe(() => this.confirmDisabled = false);
  }

  close(deleteAccount: boolean = false) {
    this.dialogRef.close(deleteAccount);
  }
}
