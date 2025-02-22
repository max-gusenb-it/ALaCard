import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '@shared';
import { RoomSettingsBottomSheet } from './containers/room-settings-bottom-sheet/room-settings-bottom-sheet.component';
import { ShareBottomSheet } from './containers/share-bottom-sheet/share-bottom-sheet.component';
import { StartGameModal } from './containers/start-game-modal/start-game-modal.component';
import { AddOfflinePlayerBottomSheet } from './containers/add-offline-player-bottom-sheet/add-offline-player-bottom-sheet.component';
import { GameComponent } from './containers/game/game.component';
import { CardFormComponent } from './containers/game/game-cards/card-forms/card-form/card-form.component';
import { PlayerVotingFormComponent } from './containers/game/game-cards/card-forms/player-voting-form/player-voting-form.component';
import { PollFormComponent } from './containers/game/game-cards/card-forms/poll-form/poll-form.component';
import { CardStatsComponent } from './containers/game/game-cards/card-stats/card-stats/card-stats.component';
import { PlayerVotingStatsComponent } from './containers/game/game-cards/card-stats/player-voting-stats/player-voting-stats.component';
import { PollStatsComponent } from './containers/game/game-cards/card-stats/poll-stats/poll-stats.component';
import { GameCardsComponent } from './containers/game/game-cards/game-cards.component';
import { GameRulesComponent } from './containers/game/game-rules/game-rules.component';
import { CardComponent, CardContainerComponent, ItAuthenticateModal, ItDeckComponent, ItPlayerComponent, ItResultComponent, ItSipResultComponent, ItSipResultsComponent } from '@features';
import { ItAddAccountModal } from '../profile/containers/it-add-account-modal/it-add-account-modal.component';
import { ItCreateRoomAsGuestModal } from '../home/containers/it-create-room-as-guest-modal/it-create-room-as-guest-modal.component';

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
