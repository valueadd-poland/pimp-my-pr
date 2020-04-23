import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RepositoryFacade } from '@pimp-my-pr/pmp-web/repository/data-access';
import { MatDialog } from '@angular/material';
import { AddRepositoryDialogComponent } from '../add-repository-dialog/add-repository-dialog.component';

@Component({
  selector: 'pimp-my-pr-repository-settings',
  templateUrl: './repository-settings.component.html',
  styleUrls: ['./repository-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositorySettingsComponent {
  repositoryCollection$ = this.repositoryFacade.repositoryCollection$;
  repositoryCollectionLoading$ = this.repositoryFacade.repositoryCollectionLoading$;
  constructor(private repositoryFacade: RepositoryFacade, private matDialog: MatDialog) {
    this.repositoryFacade.getRepositoryCollection();
  }

  openAddRepoDialog(): void {
    this.matDialog.open(AddRepositoryDialogComponent, {
      width: '350px' // Consider better way of setting width of dialogs
    });
  }
}
