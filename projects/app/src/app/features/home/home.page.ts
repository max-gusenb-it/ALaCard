import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthenticationState, User } from '@shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.page.html'
})
export class HomePage {
  @Select(AuthenticationState.user) user$: Observable<User>;
  @Select(AuthenticationState.isAuthenticated) isAuthenticated$!: Observable<boolean>;
  @Select(AuthenticationState.hasRoom) ownsRoom$!: Observable<boolean>;
}
