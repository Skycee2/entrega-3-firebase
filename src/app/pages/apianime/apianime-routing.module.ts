import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApianimePage } from './apianime.page';

const routes: Routes = [
  {
    path: '',
    component: ApianimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApianimePageRoutingModule {}
