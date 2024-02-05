import { Component, Input, OnInit } from '@angular/core';
import { IconColor } from 'src/app/shared/models/components/IconColor';

@Component({
  selector: 'it-icon',
  templateUrl: './it-icon.component.html',
  styleUrls: ['./it-icon.component.scss']
})
export class ItIconComponent {
  @Input() color: IconColor = "dark";
  @Input() size: number = 24;
}
