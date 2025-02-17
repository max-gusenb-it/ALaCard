import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'projects/app/src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { EditProfileModal } from './edit-profile-modal/edit-profile-modal.component';
import { DeleteAccountBottomSheetComponent } from './delete-account-bottom-sheet/delete-account-bottom-sheet.component';
import { NewSharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule,
    NewSharedModule
  ],
  declarations: [
    ProfilePage,
    EditProfileModal,
    DeleteAccountBottomSheetComponent
  ]
})
export class ProfilePageModule {}
