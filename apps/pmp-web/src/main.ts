import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@pimp-my-pr/pmp-web/shared/config';

if (environment.production) {
  enableProdMode();
}

function loadEnv(): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('GET', 'assets/env/env.json', true);
    req.onload = () => {
      if (req.status === 200) {
        Object.assign(environment, JSON.parse(req.responseText));
        resolve();
      } else {
        reject(
          "An error occured during loading of environment configuration file. App can't be started."
        );
      }
    };
    req.send();
  });
}

loadEnv()
  .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch(err => console.error(err));
