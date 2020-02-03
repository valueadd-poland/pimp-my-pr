import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveHoursPipe } from './pipes/resolve-hours.pipe';
import { ResolveDaysPipe } from './pipes/resolve-days.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ResolveHoursPipe, ResolveDaysPipe],
  exports: [ResolveHoursPipe, ResolveDaysPipe]
})
export class PmpWebSharedUtilModule {}
