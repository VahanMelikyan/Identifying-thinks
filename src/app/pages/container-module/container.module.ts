import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContainerRoutingModule } from './container-routing.module';
import { StoreModule } from '@ngrx/store';
import { containerFeatureKey, reducers } from './store';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature(containerFeatureKey, reducers),
    ContainerRoutingModule
  ],
  providers: [
  ]
})
export class ContainerModule {}
