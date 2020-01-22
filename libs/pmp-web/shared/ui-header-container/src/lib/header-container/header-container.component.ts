import { Component, Input } from '@angular/core';

@Component({
  selector: 'pmp-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent {
  @Input()
  label: string;

  @Input()
  avatarLabel: string;

  @Input()
  avatarUrl: string;
}
