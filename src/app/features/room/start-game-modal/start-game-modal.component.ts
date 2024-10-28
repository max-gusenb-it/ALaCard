import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { specificPlayerNameWhitecard } from 'src/app/core/constants/card';
import { Deck, GameSettings, Player, RoomSettings } from 'src/app/core/models/interfaces';
import { PopupService } from 'src/app/core/services/service/popup.service';
import { RoomActions, RoomState } from 'src/app/core/state';
import { DeckState } from 'src/app/core/state/deck';
import { StaticRoundDataUtils } from 'src/app/core/utils/static-round-data.utils';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'app-start-game-modal',
  templateUrl: './start-game-modal.component.html'
})
export class StartGameModal extends AngularLifecycle {

  currentTab: string = "";
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
    private popupService: PopupService,
    private translateService: TranslateService,
    private store: Store
  ) {
    super();

    this.store.select(RoomState.players)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => this.players = p);
  }

  onNavigation(event: string) {
    this.currentTab = event;
    if (event === "Settings") {
      this.showSettings = true;
    }
  }

  specificPersonModeAvailable() {
    if (!!!this.selectedDeck) return false;
    else return !!this.selectedDeck.cards.find(c => c.text.includes(specificPlayerNameWhitecard));
  }

  onDeckSelection(selectionId: number) {
    this.selectedDeck = this.decks[selectionId];
    this.prepareSettingsForm();
  }

  prepareSettingsForm() {
    this.gameSettingsForm.patchValue({
      specificPlayerActivated: false,
      specificPlayerId: null
    });

    if (this.selectedDeck.speficPlayerMandatory) {
      this.gameSettingsForm.controls["specificPlayerId"].addValidators(Validators.required);
    } else {
      this.gameSettingsForm.controls["specificPlayerId"].clearValidators();
    }
    if (!this.specificPersonModeAvailable()) {
      this.gameSettingsForm.controls["specificPlayerActivated"].disable();
    } else {
      this.gameSettingsForm.controls["specificPlayerActivated"].enable();
    }
    
    this.gameSettingsForm.controls['specificPlayerActivated'].updateValueAndValidity();
    this.gameSettingsForm.controls['specificPlayerId'].updateValueAndValidity();
  }

  onSubmitOrCancel(event: boolean) {
    if (!event) {
      this.modalCtrl.dismiss();
    } else {
      this.startGame();
    }
  }

  startGame() {
    let speficiPlayerId = null;
    if (
      this.selectedDeck.speficPlayerMandatory || 
      this.gameSettingsForm.controls["specificPlayerActivated"].value && this.gameSettingsForm.controls["specificPlayerId"].value != null
    ) {
      speficiPlayerId = this.gameSettingsForm.controls["specificPlayerId"].value;
    }

    let gameSettings: GameSettings = {
      speficiPlayerId: speficiPlayerId,
      drinkingGame: this.gameSettingsForm.controls["drinkingGame"].value
    }
    
    if (!StaticRoundDataUtils.isDeckPlayable(this.selectedDeck, this.store.selectSnapshot(RoomState.players), gameSettings)) {
      this.popupService.openSnackbar(
        this.translateService.instant("features.room.start-game-modal.deck-not-playable"),
        "check"
      );
      return;
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
