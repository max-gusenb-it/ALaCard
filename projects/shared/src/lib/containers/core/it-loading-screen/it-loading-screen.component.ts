import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AngularLifecycle, AuthenticationState, User } from '@shared';

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
