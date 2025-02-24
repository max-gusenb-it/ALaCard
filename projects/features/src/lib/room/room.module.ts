import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '@shared';
import {
  CardComponent,
  CardContainerComponent,
  ItAuthenticateModal,
  ItDeckComponent,
  ItPlayerComponent,
  ItResultComponent,
  ItSipResultComponent,
  ItSipResultsComponent,
  RoomSettingsBottomSheet,
  AddOfflinePlayerBottomSheet,
  GameComponent,
  CardFormComponent,
  PollFormComponent,
  CardStatsComponent,
  PlayerVotingStatsComponent,
  PollStatsComponent,
  GameCardsComponent,
  GameRulesComponent,
  ItAddAccountModal,
  ItCreateRoomAsGuestModal,
  ShareBottomSheet,
  StartGameModal,
  PlayerVotingFormComponent
} from '@features';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule,
    SharedModule,
    QRCodeModule
  ],
  declarations: [
    RoomPage,
    RoomSettingsBottomSheet,
    ShareBottomSheet,
    StartGameModal,
    AddOfflinePlayerBottomSheet,
    GameComponent,
    CardFormComponent,
    PlayerVotingFormComponent,
    PollFormComponent,
    CardStatsComponent,
    PlayerVotingStatsComponent,
    PollStatsComponent,
    GameCardsComponent,
    GameRulesComponent,
    ItSipResultComponent,
    ItDeckComponent,
    ItPlayerComponent,
    ItResultComponent,
    ItSipResultsComponent,
    ItAddAccountModal,
    ItAuthenticateModal,
    ItCreateRoomAsGuestModal,
    CardComponent,
    CardContainerComponent
  ]
})
export class RoomPageModule {}
