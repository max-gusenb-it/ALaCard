import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ILoadingError, LoadingState } from './core/state';
import { Observable, interval, takeUntil } from 'rxjs';
import { AngularLifecycle } from './shared/helper/angular-lifecycle.helper';
import { PopupService } from './core/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AngularLifecycle {
  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;
  @Select(LoadingState.error) loadingError$!: Observable<ILoadingError>;

  interval$ = interval(1000).pipe(takeUntil(this.destroyed$));

  constructor(
    private popupService: PopupService,
    private translateService: TranslateService
  ) {
    super();

    this.loadingError$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(e => {
        if (!!e) {
          this.popupService.openSnackbar(
            this.translateService.instant("errors." + e.code)
          );
        }
      });
  }
}
