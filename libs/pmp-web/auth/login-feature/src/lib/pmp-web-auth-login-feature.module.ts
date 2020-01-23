import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { PmpWebAuthLoginRoutingModule } from './pmp-web-auth-login-routing.module';
import { MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, PmpWebAuthLoginRoutingModule, MatCardModule, MatButtonModule],
  declarations: [LoginPageComponent]
})
export class PmpWebAuthLoginFeatureModule {}
