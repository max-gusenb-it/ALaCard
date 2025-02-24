import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from '@shared';
import { CreateRoomModal, GameHistoryEntryComponent, NoAccountComponent, NoRoomComponent } from '@features';

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
    NoAccountComponent,
    NoRoomComponent,
    GameHistoryEntryComponent
  ]
})
export class HomePageModule {}
