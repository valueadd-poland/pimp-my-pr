import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PmpStoreModule } from './modules/pmp-store.module';
import { ValidationModule } from './modules/validation.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PmpStoreModule,
    ValidationModule
  ]
})
export class PmpWebSharedCoreModule {}
