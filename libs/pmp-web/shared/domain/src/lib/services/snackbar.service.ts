import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action?: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action || 'Ok', {
      duration: 2000
    });
  }
}
