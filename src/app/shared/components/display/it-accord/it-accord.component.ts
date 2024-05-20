import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'it-accord',
  templateUrl: './it-accord.component.html'
})
export class ItAccordComponent implements AfterViewInit {
  private _activeAccordId: number = 0;

  @ViewChild("content") div?: ElementRef<HTMLDivElement>;

  @Input() heading: string = "";
  @Input() icon?: string;
  @Input() id: number = 0;
  @Input() set activeAccordId(value: number) {
    this._activeAccordId = value;
    if (value != this.id) this.deactivate();
  }

  @Output() accordActivated = new EventEmitter<number>();

  active: boolean = false;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateToggle();
    });
  }

  deactivate() {
    if (this.active) this.toggleAccord();
  }

  toggleAccord() {
    this.active = !this.active;
    if (this.active) this.accordActivated.emit(this.id);
    this.animateToggle();
  }

  animateToggle() {
    if (this.div == null) {
      console.error("it-accord: content element not found!");
    }

    if (this.active) {
      this.div!.nativeElement.style.maxHeight = this.div!.nativeElement.scrollHeight + "px";
    } else {
      this.div!.nativeElement.style.maxHeight = "0px";
    }
  }
}
