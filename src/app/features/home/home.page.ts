import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Authentication } from 'src/app/core/state';
import { AuthenticationState } from 'src/app/core/state/authentication/authentication.state';

@Component({
  selector: 'home',
  templateUrl: './home.page.html'
})
export class HomePage {
  @Select(AuthenticationState.isAuthenticated) isAuthenticated$!: Observable<boolean>;

  constructor(private store: Store) {}

  signOut() {
    this.store.dispatch(new Authentication.SignOut());
  }
}
