import { Component, Input } from '@angular/core';
import { PrAuthor, PrReviewer } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pmp-persons-bar',
  templateUrl: './persons-bar.component.html',
  styleUrls: ['./persons-bar.component.scss']
})
export class PersonsBarComponent {
  @Input()
  pictureSize = 32;

  @Input()
  persons: (PrReviewer | PrAuthor)[];
}
