import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/interfaces';
import { AuthenticationState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'it-loading-screen',
  templateUrl: './it-loading-screen.component.html',
  styleUrls: ['./it-loading-screen.component.scss']
})
export class ItLoadingScreenComponent extends AngularLifecycle {

  @Select(AuthenticationState.user) user$: Observable<User>;

  constructor() {
    super();
  }

}
