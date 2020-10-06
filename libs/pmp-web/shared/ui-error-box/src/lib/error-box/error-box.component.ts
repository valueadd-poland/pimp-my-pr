import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pimp-my-pr-web-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent {
  @Input() title: string;
}
