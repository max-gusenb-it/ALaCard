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
    name: new FormControl({value: "", disabled: false}),
    number: new FormControl({value: "", disabled: false}),
    password: new FormControl({value: "", disabled: false}, [Validators.required, Validators.minLength(10)]),
    color: new FormControl({value: null, disabled: false})
  });

  colors: string[] = [
    "red",
    "blue",
    "emerald",
    "violet",
    "pink",
    "amber",
    "yellow"
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
