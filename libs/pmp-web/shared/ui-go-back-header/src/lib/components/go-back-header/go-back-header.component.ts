import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pmp-go-back-header',
  templateUrl: './go-back-header.component.html',
  styleUrls: ['./go-back-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoBackHeaderComponent {
  @Input() link: string;
}
