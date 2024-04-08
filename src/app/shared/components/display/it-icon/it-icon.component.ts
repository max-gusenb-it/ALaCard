import { Component, Input } from '@angular/core';

@Component({
  selector: 'it-icon',
  templateUrl: './it-icon.component.html',
  styleUrls: ['./it-icon.component.scss']
})
export class ItIconComponent {
  @Input() color: string = "text-neutral-900";
  @Input() size: number = 1.5;
}
