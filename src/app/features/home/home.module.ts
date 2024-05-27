import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoAccountComponent } from './no-account/no-account.component';
import { LoginModal } from './login-modal/login-modal.component';
import { SignUpModal } from './sign-up-modal/sign-up-modal.component';
import { CreateAccountComponent } from './sign-up-modal/create-account/create-account.component';

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
    LoginModal,
    SignUpModal,
    NoAccountComponent,
    CreateAccountComponent
  ]
})
export class HomePageModule {}
