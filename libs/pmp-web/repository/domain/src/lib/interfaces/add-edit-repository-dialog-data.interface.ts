import { Repository } from './repository.model';

export interface AddEditRepositoryDialogData {
  submitMsg: string;
  dialogTitle: string;
  isEditMode: boolean;
  repositoryToEdit?: Repository;
}
