import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResolveHoursPipe } from './pipes/resolve-hours.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ResolveHoursPipe],
  exports: [ResolveHoursPipe]
})
export class PmpWebSharedUtilModule {}
