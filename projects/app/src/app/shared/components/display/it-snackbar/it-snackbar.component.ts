import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { takeUntil, timer } from 'rxjs';
import { SnackbarData } from 'projects/app/src/app/core/models/interfaces';
import { AngularLifecycle } from 'projects/app/src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'it-snackbar',
  templateUrl: './it-snackbar.component.html',
  styleUrls: ['./it-snackbar.component.scss'],
})
export class ItSnackbarComponent extends AngularLifecycle {

  constructor(
    public dialog: DialogRef,
    @Inject(DIALOG_DATA) public data: SnackbarData
  ) {
    super();

    if (data.autoClose) {
      timer(data.autoCloseTime ?? 3000)
        .pipe(
          takeUntil(this.destroyed$)
        )
        .subscribe(() => {
          this.close();
      });
    }
  }

  close() {
    this.dialog.close();
  }
}
