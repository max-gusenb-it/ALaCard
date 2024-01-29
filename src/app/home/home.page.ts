import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('colorForm') public colorForm: NgForm = null as any;
  
  myInput: string = "";

  formGroup = new FormGroup({
    input: new FormControl({value: "", disabled: false}, [Validators.minLength(5)]),
    color: new FormControl({value: null, disabled: false})
  });

  colors: string[] = [
    "red",
    "blue",
    "emerald",
    "violet",
    "pink",
    "amber",
    "yellow",
    "yellow-own"
  ];

  constructor() {
  }

  setColor(color: string) {
    if (!!color) {
      let colorShades = [
        "900", "800", "700", "600", "500", "400", "300", "200", "100", "000"
      ];
      const root = document.documentElement;
      colorShades.forEach(shade => {
        root.style.setProperty(`--primary-${shade}`, `var(--${color}-${shade})`);
      });
    }
  }
}
