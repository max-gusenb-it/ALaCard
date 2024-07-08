import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NoAccountComponent } from './no-account/no-account.component';
import { SignInModal } from './sign-in-modal/sign-in-modal.component';
import { SignUpModal } from './sign-up-modal/sign-up-modal.component';
import { CreateAccountComponent } from './sign-up-modal/create-account/create-account.component';
import { ForgotPasswordModal } from './forgot-password-modal/forgot-password-modal.component';
import { NoRoomComponent } from './no-room/no-room.component';
import { CreateRoomModal } from './create-room-modal/create-room-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage,
    CreateRoomModal,
    ForgotPasswordModal,
    NoAccountComponent,
    NoRoomComponent,
    SignInModal,
    SignUpModal,
    CreateAccountComponent
  ]
})
export class HomePageModule {}
