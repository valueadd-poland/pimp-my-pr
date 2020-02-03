import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pmp-time-waiting-label',
  templateUrl: './time-waiting-label.component.html',
  styleUrls: ['./time-waiting-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeWaitingLabelComponent {
  @Input() waitingTime: number;
}
