import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeaveDialogComponent } from './menu-dialogs/leave-dialog/leave-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule,
    SharedModule
  ],
  declarations: [
    RoomPage,
    LeaveDialogComponent
  ]
})
export class RoomPageModule {}
