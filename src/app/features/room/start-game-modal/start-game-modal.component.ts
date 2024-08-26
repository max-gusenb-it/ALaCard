import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Deck } from 'src/app/core/models/interfaces';
import { RoomActions } from 'src/app/core/state';
import { DeckState } from 'src/app/core/state/deck';

@Component({
  selector: 'app-start-game-modal',
  templateUrl: './start-game-modal.component.html'
})
export class StartGameModal {

  selectedDeck: Deck = null as any;

  decks: Deck[] = this.store.selectSnapshot(DeckState.decks);

  constructor(
    private modalCtrl: ModalController,
    private store: Store
  ) { }

  onNavigation(event: boolean) {
    if (!event) {
      this.modalCtrl.dismiss();
    } else {
      this.startGame();
    }
  }

  onDeckSelection(selectionId: number) {
    this.selectedDeck = this.decks[selectionId];
  }

  startGame() {
    this.store.dispatch(new RoomActions.StartGame(this.selectedDeck));
    this.modalCtrl.dismiss();
  }

}