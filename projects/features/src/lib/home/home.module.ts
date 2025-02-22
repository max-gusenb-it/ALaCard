import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CreateRoomModal } from './containers/create-room-modal/create-room-modal.component';
import { NoAccountComponent } from './containers/no-account/no-account.component';
import { NoRoomComponent } from './containers/no-room/no-room.component';
import { GameHistoryEntryComponent } from './containers/game-history-entry/game-history-entry.component';
import { SharedModule } from '@shared';

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
