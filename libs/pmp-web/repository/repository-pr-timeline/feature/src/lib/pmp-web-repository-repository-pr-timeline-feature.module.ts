import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrTimelineComponent } from './containers/pr-timeline/pr-timeline.component';
import { PrTimelineLoadingComponent } from './containers/pr-timeline/pr-timeline-loading/pr-timeline-loading.component';
import { PrTimelineSettingsComponent } from './containers/pr-timeline/pr-timeline-settings/pr-timeline-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { PmpWebRepositoryRepositoryPrTimelineDataAccessModule } from '@pimp-my-pr/pmp-web/repository/repository-pr-timeline/data-access';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { PmpWebSharedUiGoBackHeaderModule } from '@pimp-my-pr/pmp-web/shared/ui-go-back-header';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { PmpWebSharedUiErrorBoxModule } from '@pimp-my-pr/pmp-web/shared/ui-error-box';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PmpWebRepositoryRepositoryPrTimelineUiChartsModule } from '@pimp-my-pr/pmp-web/repository/repository-pr-timeline/ui-charts';
import { ValidationMessagesModule } from '@valueadd/validation-messages';
import { PmpWebRepositoryRepositoryPrTimelineFeatureRoutingModule } from './pmp-web-repository-repository-pr-timeline-feature-routing.module';

@NgModule({
  imports: [
    PmpWebSharedUiGoBackHeaderModule,
    PmpWebRepositoryRepositoryPrTimelineUiChartsModule,
    PmpWebSharedUiErrorBoxModule,
    MatNativeDateModule,
    PmpWebRepositoryRepositoryPrTimelineFeatureRoutingModule,
    PmpWebRepositoryRepositoryPrTimelineDataAccessModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ValidationMessagesModule
  ],
  declarations: [PrTimelineComponent, PrTimelineSettingsComponent, PrTimelineLoadingComponent]
})
export class PmpWebRepositoryRepositoryPrTimelineFeatureModule {}
