import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'projects/app/src/app/core/models/interfaces';
import { AuthenticationState } from 'projects/app/src/app/core/state';
import { AngularLifecycle } from '@shared';

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
