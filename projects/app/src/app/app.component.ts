import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, interval, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AngularLifecycle, ErrorMonitorState, IItError, LoadingState, PopUpService } from '@shared';

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
    private popUpService: PopUpService,
    private translateService: TranslateService
  ) {
    super();

    this.itError$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(e => {
        if (!!e) {
          this.popUpService.openSnackbar(
            this.translateService.instant("errors." + e.code)
          );
        }
      });
  }
}
