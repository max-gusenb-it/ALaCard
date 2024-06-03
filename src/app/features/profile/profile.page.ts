import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/interfaces/logic/IUser';
import { Authentication, AuthenticationState } from 'src/app/core/state';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html'
})
export class ProfilePage {
  @Select(AuthenticationState.user) user$!: Observable<IUser>;

  constructor(private store: Store) {}

  signOut() {
    this.store.dispatch(new Authentication.SignOut());
  }

}
