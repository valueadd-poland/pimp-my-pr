import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveHours } from './pipes/resolve-hours.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [ResolveHours],
  declarations: [ResolveHours]
})
export class PmpWebSharedUtilModule {}
