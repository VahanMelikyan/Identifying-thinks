import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavParams } from '@ionic/angular';
import { ContainerThingRoutingModule } from './container-thing-routing.module';
import { ContainerThingPage } from './container-thing.page';
import { ContainerItemComponent } from '../../../components/container-item/container-item.component';
import { FormComponent } from '../../../components/form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContainerThingRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ContainerThingPage, ContainerItemComponent, FormComponent],
  providers: [
    NavParams
  ]
})
export class ContainerThingPageModule {}
