import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoadingState } from './core/state';
import { Observable, interval, takeUntil } from 'rxjs';
import { AngularLifecycle } from './shared/helper/angular-lifecycle.helper';
import { PopupService } from './core/services/popup.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMonitorState } from './core/state/error/error-monitor.state';
import { IItError } from './core/models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AngularLifecycle {
  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;
  @Select(ErrorMonitorState.error) itError$!: Observable<IItError>;

  interval$ = interval(1000).pipe(takeUntil(this.destroyed$));

  constructor(
    private popupService: PopupService,
    private translateService: TranslateService
  ) {
    super();

    this.itError$
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
