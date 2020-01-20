import { Component, Input } from '@angular/core';

@Component({
  selector: 'pmp-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent {
  @Input()
  header: String;

  @Input()
  avatarLabel: String;

  @Input()
  avatarUrl: String;
}
