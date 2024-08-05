import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShareBottomSheet } from './menu-bottom-sheets/share-bottom-sheet/share-bottom-sheet.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RoomSettingsBottomSheet } from './menu-bottom-sheets/room-settings-bottom-sheet/room-settings-bottom-sheet.component';

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
    ShareBottomSheet
  ]
})
export class RoomPageModule {}
