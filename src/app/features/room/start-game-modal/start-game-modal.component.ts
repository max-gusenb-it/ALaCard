import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { specificPlayerNameWhitecard } from 'src/app/core/constants/card';
import { Deck, Player } from 'src/app/core/models/interfaces';
import { RoomActions, RoomState } from 'src/app/core/state';
import { DeckState } from 'src/app/core/state/deck';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'app-start-game-modal',
  templateUrl: './start-game-modal.component.html'
})
export class StartGameModal extends AngularLifecycle {
  players: Player[];

  decks: Deck[] = this.store.selectSnapshot(DeckState.decks);
  selectedDeck: Deck = null as any;

  showSettings: boolean = false;

  gameSettingsForm: FormGroup = new FormGroup({
    drinkingGame: new FormControl({value: false, disabled: false}),
    specificPlayerActivated: new FormControl({value: false, disabled: false}),
    specificPlayerId: new FormControl({value: null, disabled: false}),
  });

  constructor(
    private modalCtrl: ModalController,
    private store: Store
  ) {
    super();

    this.store.select(RoomState.players)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => this.players = p);
  }

  onNavigation(event: string) {
    if (event === "Deck") {
      this.gameSettingsForm.controls["specificPlayerId"].clearValidators();
      this.gameSettingsForm.controls['specificPlayerId'].updateValueAndValidity();
    }
    if (event === "Settings") {
      if (this.selectedDeck.speficPlayerMandatory) {
        this.gameSettingsForm.controls["specificPlayerId"].addValidators(Validators.required);
        this.gameSettingsForm.controls['specificPlayerId'].updateValueAndValidity();
      }
      if (!this.specificPersonModeAvailable()) {
        this.gameSettingsForm.patchValue({
          specificPlayerActivated: false,
          specificPlayerId: null
        });
        this.gameSettingsForm.controls["specificPlayerActivated"].disable();
      } else {
        this.gameSettingsForm.controls["specificPlayerActivated"].enable();
      }
      this.showSettings = event === "Settings";
    }
  }

  specificPersonModeAvailable() {
    if (!!!this.selectedDeck) return false;
    else return !!this.selectedDeck.cards.find(c => c.text.includes(specificPlayerNameWhitecard));
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
    let speficiPlayerId = null;
    if (
      this.selectedDeck.speficPlayerMandatory || 
      this.gameSettingsForm.controls["specificPlayerActivated"].value && this.gameSettingsForm.controls["specificPlayerId"].value != null
    ) {
      speficiPlayerId = this.gameSettingsForm.controls["specificPlayerId"].value;
    }

    this.store.dispatch(new RoomActions.StartGame(
      this.selectedDeck,
      {
        speficiPlayerId: speficiPlayerId,
        drinkingGame: this.gameSettingsForm.controls["drinkingGame"].value
      }
    ));
    this.modalCtrl.dismiss();
  }

}
