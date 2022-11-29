import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApianimePageRoutingModule } from './apianime-routing.module';

import { ApianimePage } from './apianime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApianimePageRoutingModule
  ],
  declarations: [ApianimePage]
})
export class ApianimePageModule {}
