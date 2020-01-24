import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpStoreModule } from './modules/pmp-store.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, BrowserModule, HttpClientModule, BrowserAnimationsModule, PmpStoreModule]
})
export class PmpWebCoreModule {}
