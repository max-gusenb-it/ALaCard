import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoadingState } from './core/state';
import { Observable, filter, interval, takeUntil } from 'rxjs';
import { AngularLifecycle } from './shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent extends AngularLifecycle {
  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;

  borderType: number = 1;

  // ToDo clean up & fix padding

  constructor() {
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
  }

  getBorderLoadingColor() {
    return this.borderType;
  }
}
