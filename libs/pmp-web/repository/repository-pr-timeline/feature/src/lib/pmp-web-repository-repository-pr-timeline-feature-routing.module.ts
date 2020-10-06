import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrTimelineComponent } from './containers/pr-timeline/pr-timeline.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: PrTimelineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class PmpWebRepositoryRepositoryPrTimelineFeatureRoutingModule {}
