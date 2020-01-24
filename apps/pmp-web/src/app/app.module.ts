import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PmpWebRepositoryShellModule } from '@pimp-my-pr/pmp-web/repository/shell';
import { PmpWebUserShellModule } from '@pimp-my-pr/pmp-web/user/shell';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    NxModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    AppRoutingModule,
    PmpWebRepositoryShellModule,
    PmpWebUserShellModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
