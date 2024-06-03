import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ILoadingError, LoadingError, LoadingState } from './core/state';
import { Observable, filter, interval, takeUntil } from 'rxjs';
import { AngularLifecycle } from './shared/helper/angular-lifecycle.helper';
import { DialogService } from './core/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent extends AngularLifecycle {
  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;

  @Select(LoadingState.error) loadingError$!: Observable<ILoadingError>;

  borderType: number = 1;

  // ToDo clean up & fix padding

  constructor(
    private dialogService: DialogService,
    private translateService: TranslateService
  ) {
    super();
    interval(1000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        if (this.borderType === 1) {
          this.borderType = 2;
        } else {
          this.borderType = 1;
        }
    });

    this.isLoading$
      .pipe(
        filter(l => !l),
        takeUntil(this.destroyed$)
      ).subscribe(() => {
        this.borderType = 1;
    });

    this.loadingError$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(e => {
        if (!!e) {
          this.dialogService.openSnackbar(
            this.translateService.instant("errors." + e.code)
          );
        }
      });
  }

  getBorderLoadingColor() {
    return this.borderType;
  }
}
