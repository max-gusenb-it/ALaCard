import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'it-accordion',
  templateUrl: './it-accordion.component.html'
})
export class ItAccordionComponent implements OnInit {

  openedAccordId: number = 0;

  constructor() { }

  ngOnInit() {}

  onAccordOpen(id: number) {
    this.openedAccordId = id;
  }

}
