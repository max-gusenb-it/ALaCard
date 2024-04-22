import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'it-accord',
  templateUrl: './it-accord.component.html'
})
export class ItAccordComponent implements AfterViewInit {
  private _openedAccordId: number = 0;

  @ViewChild("content") div?: ElementRef<HTMLDivElement>;

  @Input() heading: string = "";
  @Input() icon?: string;
  @Input() id: number = 0;
  @Input() set openedAccordId(value: number) {
    this._openedAccordId = value;
    if (value != this.id) this.close();
  }

  @Output() accordOpened = new EventEmitter<number>();

  opened: boolean = false;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateToggle();
    });
  }

  close() {
    if (this.opened) this.toggleAccord();
  }

  toggleAccord() {
    this.opened = !this.opened;
    if (this.opened) this.accordOpened.emit(this.id);
    this.animateToggle();
  }

  animateToggle() {
    if (this.div == null) {
      console.error("it-accord: content element not found!");
    }

    if (this.opened) {
      this.div!.nativeElement.style.maxHeight = this.div!.nativeElement.scrollHeight + "px";
    } else {
      this.div!.nativeElement.style.maxHeight = "0px";
    }
  }
}
