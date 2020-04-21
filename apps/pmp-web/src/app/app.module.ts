import { NgModule } from '@angular/core';
import { PmpWebAuthShellModule } from '@pimp-my-pr/pmp-web/auth/shell';
import { PmpWebSharedCoreModule } from '@pimp-my-pr/pmp-web/shared/core';
import { PmpWebRepositoryShellModule } from '@pimp-my-pr/pmp-web/repository/shell';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    PmpWebSharedCoreModule,
    PmpWebRepositoryShellModule,
    PmpWebAuthShellModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
