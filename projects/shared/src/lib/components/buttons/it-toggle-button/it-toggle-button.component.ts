import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ItSelectableComponent } from '@shared';

@Component({
  selector: 'it-toggle-button',
  templateUrl: './it-toggle-button.component.html',
  styleUrl: './it-toggle-button.component.scss',
  host: {
    '[class.bg-primary-300]': 'selected',
    '(click)': 'toggleState()',
  },
  providers: [{provide: ItSelectableComponent, useExisting: forwardRef(() => ItToggleButtonComponent)}],
})
export class ItToggleButtonComponent extends ItSelectableComponent {

  @HostBinding('style.flex-grow')
  flexGrow = 10;

  @Input() icon: string;

  override quietSelect(): void {
    this.flexGrow = 12;
    super.quietSelect();
  }

  override quietUnselect(): void {
    this.flexGrow = 10;
    super.quietUnselect();
  }

}
