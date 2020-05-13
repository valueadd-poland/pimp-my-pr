import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PmpWebAuthDataAccessModule } from '@pimp-my-pr/pmp-web/auth/data-access';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { PmpWebAuthLoginRoutingModule } from './pmp-web-auth-login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PmpWebAuthLoginRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PmpWebAuthDataAccessModule
  ],
  declarations: [LoginPageComponent]
})
export class PmpWebAuthLoginFeatureModule {}
