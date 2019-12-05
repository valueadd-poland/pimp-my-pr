import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PmpWebRepositoryUsersFeatureModule } from '@pimp-my-pr/pmp-web/repository-users/feature';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PmpWebRepositoryUsersFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
