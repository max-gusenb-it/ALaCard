import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PopupService } from 'projects/app/src/app/core/services/service/popup.service';

@Component({
  selector: 'app-test',
  templateUrl: 'test.page.html'
})
export class TestPage {
  colors: string[] = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "pink",
    "rose"
  ];

  @ViewChild('colorForm') public colorForm: NgForm = null as any;
  
  myInput: string = "";

  formGroup = new FormGroup({
    name: new FormControl({value: "", disabled: false}),
    number: new FormControl({value: "", disabled: false}, Validators.maxLength(10)),
    password: new FormControl({value: "", disabled: false}, [Validators.required, Validators.minLength(10)]),
    color: new FormControl({value: null, disabled: false}, Validators.required),
    description: new FormControl({value: "", disabled: false}, [Validators.required, Validators.maxLength(100)]),
    age_restriction: new FormControl({value: false, disabled: false}),
    register: new FormControl(false)
  });

  chips = [
    { title: "All cards", selected: false },
    { title: "Answer Creation", selected: false },
    { title: "Quiz", selected: false },
    { title: "Topic Voting", selected: false },
    { title: "Player Voting", selected: false },
    { title: "Free Text", selected: false },
    { title: "Truth or dare", selected: false },
    { title: "Never have i ever", selected: false },
    { title: "Would you rather", selected: false },
  ];

  constructor(private popupService: PopupService) {}

  setColor(color: string) {
    if (color) {
      let colorShades = [
        "900", "800", "700", "600", "500", "400", "300", "200", "100", "000"
      ];
      const root = document.documentElement;
      colorShades.forEach(shade => {
        const rgb = this.hexToRgb(getComputedStyle(document.documentElement).getPropertyValue(`--${color}-${shade}`))!;
        root.style.setProperty(`--primary-${shade}`, `${rgb.r} ${rgb.g} ${rgb.b}`);
      });
    }
  }

  hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  openSnackbar() {
    this.popupService.openSnackbar("No button to continue? Swipe to the left side to resume the game", "home", true);
  }

  tabsChanged(event: boolean) {
    if (event) {
      console.log ("Tabs are finished :)");
    } else {
      console.log ("Tabs were cancelled :(");
    }
  }

  test(input?: string) {
    console.log (input ?? window.innerWidth);
  }
}
