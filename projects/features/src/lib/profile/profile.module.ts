import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedModule } from '@shared';
import { EditProfileModal } from './containers/edit-profile-modal/edit-profile-modal.component';
import { DeleteAccountBottomSheetComponent } from './containers/delete-account-bottom-sheet/delete-account-bottom-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfilePage,
    EditProfileModal,
    DeleteAccountBottomSheetComponent
  ]
})
export class ProfilePageModule {}
