import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  GoogleAnalyticsService,
  PmpWebSharedUtilGoogleAnalyticsModule
} from '@pimp-my-pr/pmp-web/shared/util-google-analytics';

@NgModule({
  imports: [PmpWebSharedUtilGoogleAnalyticsModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (googleService: GoogleAnalyticsService) => () => googleService.init(),
      deps: [GoogleAnalyticsService],
      multi: true
    }
  ]
})
export class PmpWebShellModule {}
