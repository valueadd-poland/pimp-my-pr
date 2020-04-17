import { NgModule } from '@angular/core';
import { PmpWebAuthShellModule } from '@pimp-my-pr/pmp-web/auth/shell';
import { PmpWebCoreModule } from '@pimp-my-pr/pmp-web/core';
import { PmpWebRepositoryShellModule } from '@pimp-my-pr/pmp-web/repository/shell';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, PmpWebCoreModule, PmpWebRepositoryShellModule, PmpWebAuthShellModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
