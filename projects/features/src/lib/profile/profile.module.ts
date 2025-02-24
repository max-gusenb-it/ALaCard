import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedModule } from '@shared';
import { ItDeleteAccountBottomSheetComponent, ItEditProfileModal } from '@features';

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
    ItEditProfileModal,
    ItDeleteAccountBottomSheetComponent
  ]
})
export class ProfilePageModule {}
