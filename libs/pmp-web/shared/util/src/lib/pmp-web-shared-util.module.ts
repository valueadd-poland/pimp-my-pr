import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { ResolveHoursPipe } from './pipes/resolve-hours/resolve-hourse.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TimeAgoPipe, ResolveHoursPipe],
  exports: [TimeAgoPipe, ResolveHoursPipe]
})
export class PmpWebSharedUtilModule {}
