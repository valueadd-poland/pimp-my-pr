import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './containers/main/main.component';
import { PmpWebSharedUiNavbarModule } from '@pimp-my-pr/pmp-web/shared/ui/navbar';
import { PmpWebSharedUiSidebarModule } from '@pimp-my-pr/pmp-web/shared/ui/sidebar';

@NgModule({
  imports: [
    CommonModule,
    ShellRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PmpWebSharedUiNavbarModule,
    PmpWebSharedUiSidebarModule
  ],
  exports: [ShellRoutingModule],
  declarations: [MainComponent]
})
export class PmpWebShellModule {}
