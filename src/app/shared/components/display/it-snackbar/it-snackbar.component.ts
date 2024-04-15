import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { takeUntil, timer } from 'rxjs';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { ISnackbarData } from 'src/app/shared/models/interfaces/snackbar/ISnackbarData';

@Component({
  selector: 'app-it-snackbar',
  templateUrl: './it-snackbar.component.html',
  styleUrls: ['./it-snackbar.component.scss'],
})
export class ItSnackbarComponent extends AngularLifecycle {

  constructor(
    public dialog: DialogRef,
    @Inject(DIALOG_DATA) public data: ISnackbarData
  ) {
    super();

    if (data.autoClose) {
      timer(3000)
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
