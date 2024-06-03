import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/core/state/authentication/authentication.state';

@Component({
  selector: 'home',
  templateUrl: './home.page.html'
})
export class HomePage {
  @Select(AuthenticationState.isAuthenticated) isAuthenticated$!: Observable<boolean>;
}
