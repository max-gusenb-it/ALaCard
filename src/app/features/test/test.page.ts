import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ExampleComponent } from '../../shared/components/display/example/example.component';
import { DialogService } from '../../shared/services/dialog.service';

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

  decks = [
    {
      title: "A la card",
      cardCount: 300,
      description: "The first and one of the best decks ever created",
      icon: "🎉",
      flags: ["All cards", "2+ Players"]
    },
    {
      title: "Lord of the Rings Quiz",
      cardCount: 65,
      description: "Quiz about the famous movie triollogy",
      icon: "💍",
      flags: ["Quiz", "2+ Players"]
    },
    {
      title: "Do you know your partner?",
      cardCount: 48,
      description: "Funny game to test, how good you know your partner",
      icon: "💌",
      flags: ["2 Players", "Player Voting", "Answer Creation", "Quiz", "Never have i ever"]
    },
    {
      title: "Extrem drinking Game",
      cardCount: 189,
      description: "Are you ready to get drunk with your friends?",
      icon: "🍺",
      flags: ["2+ Players", "All cards"]
    },
  ]

  constructor(private dialog: DialogService) {}

  setColor(color: string) {
    if (!!color) {
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

  openDialog() {
    const ref = this.dialog.open(
      ExampleComponent
    );

    ref.closed.subscribe(() => {
      console.log ("closed");
    });
  }

  openSnackbar() {
    this.dialog.openSnackbar("No button to continue? Swipe to the left side to resume the game", "home", true);
  }

  tabsChanged(event: boolean) {
    if (event) {
      console.log ("Tabs are finished :)");
    } else {
      console.log ("Tabs were cancelled :(");
    }
  }

  test(input?: number) {
    console.log (input ?? window.innerWidth);
  }
}
