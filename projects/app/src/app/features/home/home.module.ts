import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'projects/app/src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NoAccountComponent } from './no-account/no-account.component';
import { NoRoomComponent } from './no-room/no-room.component';
import { CreateRoomModal } from './create-room-modal/create-room-modal.component';
import { GameHistoryEntryComponent } from './game-history-entry/game-history-entry.component';
import { NewSharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    NewSharedModule
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
