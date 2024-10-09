import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  decks: Deck[] = this.store.selectSnapshot(DeckState.decks);
  selectedDeck: Deck = null as any;

  showSettings: boolean = false;

  gameSettingsForm: FormGroup = new FormGroup({
    specificPlayerActivated: new FormControl({value: true, disabled: false})
  });

  constructor(
    private modalCtrl: ModalController,
    private store: Store
  ) { }

  onNavigation(event: string) {
    console.log(event);
    this.showSettings = event === "Settings";
  }

  onSubmitOrCancel(event: boolean) {
    if (!event) {
      this.modalCtrl.dismiss();
    } else {
      this.startGame();
    }
  }

  onDeckSelection(selectionId: number) {
    this.selectedDeck = this.decks[selectionId];
  }

  isSpecificPlayerAvailable() {

  }

  startGame() {
    this.store.dispatch(new RoomActions.StartGame(this.selectedDeck));
    this.modalCtrl.dismiss();
  }

}
