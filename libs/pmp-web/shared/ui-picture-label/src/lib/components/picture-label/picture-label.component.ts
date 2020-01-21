import { Component, Input } from '@angular/core';

@Component({
  selector: 'pmp-picture-label',
  templateUrl: './picture-label.component.html',
  styleUrls: ['./picture-label.component.scss']
})
export class PictureLabelComponent {
  @Input() label: string;
  @Input() picture: string;
  @Input() pictureSize = 32;

  fallbackImage = 'https://www.drupal.org/files/issues/default-avatar.png';
}
