import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'projects/app/src/app/core/models/interfaces';
import { AuthenticationState } from 'projects/app/src/app/core/state/authentication/authentication.state';

@Component({
  selector: 'home',
  templateUrl: './home.page.html'
})
export class HomePage {
  @Select(AuthenticationState.user) user$: Observable<User>;
  @Select(AuthenticationState.isAuthenticated) isAuthenticated$!: Observable<boolean>;
  @Select(AuthenticationState.hasRoom) ownsRoom$!: Observable<boolean>;
}
