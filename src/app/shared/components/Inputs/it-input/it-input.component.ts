import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'it-input',
  templateUrl: './it-input.component.html',
  styleUrls: ['./it-input.component.scss'],
})
export class ItInputComponent  implements OnInit {
  @Input() label: string = "Label";
  @Input() type: string = "text";
  @Output() valueChange = new EventEmitter<string>();
  
  control: FormControl = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit() {}

  getLabel() {
    return this.label;
  }
}
