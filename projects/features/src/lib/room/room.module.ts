import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '@shared';
import {
  ItCardComponent,
  ItCardContainerComponent,
  ItAuthenticateModal,
  ItDeckComponent,
  ItPlayerComponent,
  ItResultComponent,
  ItSipResultComponent,
  ItSipResultsComponent,
  ItRoomSettingsBottomSheet,
  ItAddOfflinePlayerBottomSheet,
  ItGameComponent,
  ItCardFormComponent,
  ItTopicVotingFormComponent,
  ItCardStatsComponent,
  ItPlayerVotingStatsComponent,
  ItTopicVotingStatsComponent,
  ItGameCardsComponent,
  ItGameRulesComponent,
  ItAddAccountModal,
  ItCreateRoomAsGuestModal,
  ItShareBottomSheet,
  ItStartGameModal,
  ItPlayerVotingFormComponent
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
    ItRoomSettingsBottomSheet,
    ItShareBottomSheet,
    ItStartGameModal,
    ItAddOfflinePlayerBottomSheet,
    ItGameComponent,
    ItCardFormComponent,
    ItPlayerVotingFormComponent,
    ItTopicVotingFormComponent,
    ItCardStatsComponent,
    ItPlayerVotingStatsComponent,
    ItTopicVotingStatsComponent,
    ItGameCardsComponent,
    ItGameRulesComponent,
    ItSipResultComponent,
    ItDeckComponent,
    ItPlayerComponent,
    ItResultComponent,
    ItSipResultsComponent,
    ItAddAccountModal,
    ItAuthenticateModal,
    ItCreateRoomAsGuestModal,
    ItCardComponent,
    ItCardContainerComponent
  ]
})
export class RoomPageModule {}
