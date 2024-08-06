import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Deck } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-start-game-modal',
  templateUrl: './start-game-modal.component.html'
})
export class StartGameModal {

  selectedDeck: Deck = null as any;

  decks: Deck[] = [
    {
      name: "A la card",
      description: "The first and one of the best decks ever created",
      icon: "🎉",
      cards: [null as any, null as any, null as any, null as any]
    },
    {
      name: "Lord of the Rings Quiz",
      description: "Quiz about the famous movie triollogy",
      icon: "💍",
      cards: [null as any, null as any, null as any, null as any]
    },
    {
      name: "Do you know your partner?",
      description: "Funny game to test, how good you know your partner",
      icon: "💌",
      cards: [null as any, null as any, null as any, null as any]
    },
    {
      name: "Extrem drinking Game",
      description: "Are you ready to get drunk with your friends?",
      icon: "🍺",
      cards: [null as any, null as any, null as any, null as any]
    }
  ];

  constructor(private modalCtrl: ModalController) { }

  onNavigation(event: boolean) {
    if (!event) {
      this.modalCtrl.dismiss();
    }
  }

  onDeckSelection(selectionId: number) {
    this.selectedDeck = this.decks[selectionId];
  }

}
