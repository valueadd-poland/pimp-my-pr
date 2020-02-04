import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pmp-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContainerComponent {
  @Input()
  label: string;

  @Input()
  avatarLabel: string;

  @Input()
  avatarUrl: string;
}
