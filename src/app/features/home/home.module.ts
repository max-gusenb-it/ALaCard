import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoAccountComponent } from './no-account/no-account.component';
import { SignInModal } from './sign-in-modal/sign-in-modal.component';
import { SignUpModal } from './sign-up-modal/sign-up-modal.component';
import { CreateAccountComponent } from './sign-up-modal/create-account/create-account.component';
import { ForgotPasswordModal } from './forgot-password-modal/forgot-password-modal.component';

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
    ForgotPasswordModal,
    SignInModal,
    SignUpModal,
    NoAccountComponent,
    CreateAccountComponent
  ]
})
export class HomePageModule {}
