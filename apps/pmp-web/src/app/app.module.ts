import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PmpWebShellModule } from '@pimp-my-pr/pmp-web/shell';

@NgModule({
  declarations: [AppComponent],
  imports: [PmpWebShellModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
