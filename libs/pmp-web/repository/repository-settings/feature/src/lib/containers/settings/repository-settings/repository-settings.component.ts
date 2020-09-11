import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RepositoryFacade } from '@pimp-my-pr/pmp-web/repository/data-access';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRepositoryDialogComponent } from '../add-edit-repository-dialog/add-edit-repository-dialog.component';
import { AddEditRepositoryDialogData, Repository } from '@pimp-my-pr/pmp-web/repository/domain';
import { GenericDialogComponent } from '@pimp-my-pr/pmp-web/shared/ui-generic-dialog';

@Component({
  selector: 'pmp-repository-settings',
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

  onDeleteRespository(repository: Repository): void {
    this.matDialog
      .open(GenericDialogComponent, { autoFocus: false })
      .afterClosed()
      .subscribe((shouldDelete: boolean) => {
        if (shouldDelete) {
          this.repositoryFacade.deleteRepository({ repositoryId: repository.id });
        }
      });
  }

  onEditRepository(repository: Repository): void {
    this.matDialog.open<AddEditRepositoryDialogComponent, AddEditRepositoryDialogData>(
      AddEditRepositoryDialogComponent,
      {
        panelClass: 'add-edit-repository-dialog',
        data: {
          submitMsg: 'Update',
          dialogTitle: `Edit ${repository.name} repository`,
          repositoryToEdit: repository
        }
      }
    );
  }

  openAddRepoDialog(): void {
    this.matDialog.open<AddEditRepositoryDialogComponent, AddEditRepositoryDialogData>(
      AddEditRepositoryDialogComponent,
      {
        panelClass: 'add-edit-repository-dialog',
        data: {
          submitMsg: 'Add',
          dialogTitle: 'Add repository'
        }
      }
    );
  }
}
