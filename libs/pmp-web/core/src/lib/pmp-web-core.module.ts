import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentModule } from './environment/environment.module';
import { PmpStoreModule } from './ngrx/pmp-store.module';
import { ValidationModule } from './modules/validation.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EnvironmentModule,
    HttpClientModule,
    PmpStoreModule,
    ValidationModule
  ]
})
export class PmpWebCoreModule {}
