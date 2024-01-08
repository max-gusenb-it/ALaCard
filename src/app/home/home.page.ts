import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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

  constructor() {}

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
