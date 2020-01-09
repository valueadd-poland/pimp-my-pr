import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PmpWebRepositoryShellModule } from '@pimp-my-pr/pmp-web/repository/shell';
import { PmpWebUserShellModule } from '@pimp-my-pr/pmp-web/user/shell';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    PmpWebRepositoryShellModule,
    PmpWebUserShellModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
