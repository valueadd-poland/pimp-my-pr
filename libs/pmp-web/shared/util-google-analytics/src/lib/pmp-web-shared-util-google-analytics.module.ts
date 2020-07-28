import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAnalyticsService } from './google-analytics.service';

@NgModule({
  imports: [CommonModule],
  providers: [GoogleAnalyticsService]
})
export class PmpWebSharedUtilGoogleAnalyticsModule {}
