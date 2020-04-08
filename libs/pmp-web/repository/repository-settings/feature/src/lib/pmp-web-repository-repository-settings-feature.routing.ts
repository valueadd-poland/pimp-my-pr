import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositorySettingsComponent } from './containers/repository-settings/repository-settings.component';

const routes: Routes = [
  {
    path: '',
    component: RepositorySettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebRepositoryRepositorySettingsFeatureRouting {}
