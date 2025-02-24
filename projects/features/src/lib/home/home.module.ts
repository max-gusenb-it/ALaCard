import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from '@shared';
import { ItCreateRoomModal, ItGameHistoryEntryComponent, ItNoAccountComponent, ItNoRoomComponent } from '@features';

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
    ItCreateRoomModal,
    ItNoAccountComponent,
    ItNoRoomComponent,
    ItGameHistoryEntryComponent
  ]
})
export class HomePageModule {}
