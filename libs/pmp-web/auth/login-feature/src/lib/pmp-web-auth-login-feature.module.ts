import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { PmpWebAuthLoginRoutingModule } from './pmp-web-auth-login-routing.module';

@NgModule({
  imports: [CommonModule, PmpWebAuthLoginRoutingModule, MatCardModule, MatButtonModule],
  declarations: [LoginPageComponent]
})
export class PmpWebAuthLoginFeatureModule {}
