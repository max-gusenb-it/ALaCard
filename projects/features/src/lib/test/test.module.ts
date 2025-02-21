import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TestPage } from './test.page';

import { TestPageRoutingModule } from './test-routing.module';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    SharedModule
  ],
  declarations: [TestPage]
})
export class TestPageModule {}
