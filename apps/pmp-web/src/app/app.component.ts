import { Component } from '@angular/core';
import { environment } from '@pimp-my-pr/pmp-web/shared/config';
// tslint:disable-next-line:nx-enforce-module-boundaries @ToDo how to handle such cases
import { GoogleAnalyticsService } from '@pimp-my-pr/pmp-web/shared/util-google-analytics';

@Component({
  selector: 'pmp-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private googleAnalytics: GoogleAnalyticsService) {
    if (environment.googleAnalyticsId) {
      googleAnalytics.insertGoogleAnalyticsScript(environment.googleAnalyticsId);
    }
  }
}
