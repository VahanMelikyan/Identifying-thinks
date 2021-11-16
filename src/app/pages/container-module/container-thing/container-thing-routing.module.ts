import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerThingPage } from './container-thing.page';

const routes: Routes = [
  {
    path: '',
    component: ContainerThingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerThingRoutingModule {}
