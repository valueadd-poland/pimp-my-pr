import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './containers/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: []
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class ShellRoutingModule {}
