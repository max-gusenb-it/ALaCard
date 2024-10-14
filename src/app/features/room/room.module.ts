import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ShareBottomSheet } from './bottom-sheets/share-bottom-sheet/share-bottom-sheet.component';
import { AddOfflinePlayerBottomSheet } from './bottom-sheets/add-offline-player-bottom-sheet/add-offline-player-bottom-sheet.component';
import { RoomSettingsBottomSheet } from './bottom-sheets/room-settings-bottom-sheet/room-settings-bottom-sheet.component';
import { StartGameModal } from './start-game-modal/start-game-modal.component';
import { GameComponent } from './game/game.component';
import { CardComponent } from './game/card/card.component';
import { GameRulesComponent } from './game/game-rules/game-rules.component';
import { GameCardsComponent } from './game/game-cards/game-cards.component';
import { PlayerVotingFormComponent } from './game/game-cards/card-forms/player-voting-form/player-voting-form.component';
import { CardFormComponent } from './game/game-cards/card-forms/card-form/card-form.component';
import { CardContainerComponent } from './game/game-cards/card-container/card-container.component';

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
    CardComponent,
    CardContainerComponent,
    CardFormComponent,
    PlayerVotingFormComponent,
    GameCardsComponent,
    GameRulesComponent
  ]
})
export class RoomPageModule {}
