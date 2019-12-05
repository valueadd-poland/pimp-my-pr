import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'resolveHours' })
export class ResolveHours implements PipeTransform {
  transform(value: number): string {
    if (value > 1) {
      return `${value} hours`;
    } else {
      return `${value} hour`;
    }
  }
}
