import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/interfaces/logic/IUser';
import { Authentication, AuthenticationState } from 'src/app/core/state';
import { EditProfileModal } from './edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html'
})
export class ProfilePage {
  @Select(AuthenticationState.user) user$!: Observable<IUser>;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  async editProfile() {
    const user = this.store.selectSnapshot(AuthenticationState.user);

    const modal = await this.modalCtrl.create({
      component: EditProfileModal,
      componentProps: {
        user: user
      }
    });
    modal.present();
  }

  signOut() {
    this.store.dispatch(new Authentication.SignOut())
      .subscribe(() => {
        this.navCtrl.navigateBack("/home");
      });
  }

}
