import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { speficiPlayerIdSettingName } from 'src/app/core/constants/game-settings';
import { Deck, GameSettings, Player } from 'src/app/core/models/interfaces';
import { PopupService } from 'src/app/core/services/service/popup.service';
import { RoomActions, RoomState } from 'src/app/core/state';
import { DeckState } from 'src/app/core/state/deck';
import { GameSettingsUtils } from 'src/app/core/utils/game-settings.utils';
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
    private store: Store,
    private popupService: PopupService,
    private translateService: TranslateService
  ) {
    super();

    this.store.select(RoomState.players)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => this.players = p);
  }

  onNavigation(event: string) {
    if (this.currentTab !== "Settings" && event === "Settings" && GameSettingsUtils.areSettingsPreset(this.selectedDeck.defaultGameSettings)) {
      this.startGame();
      return;
    }
    this.currentTab = event;
    if (event === "Settings") {
      this.showSettings = true;
    }
  }

  specificPersonModeRequired() {
    return GameSettingsUtils.settingInputRequired(speficiPlayerIdSettingName, undefined, this.selectedDeck.defaultGameSettings);
  }

  specificPersonModeAvailable() {
    return GameSettingsUtils.settingAvailable(speficiPlayerIdSettingName, undefined, this.selectedDeck.defaultGameSettings);
  }

  areSettingsPreset() {
    if (!!!this.selectedDeck) return false;
    return GameSettingsUtils.areSettingsPreset(this.selectedDeck.defaultGameSettings);
  }

  onDeckSelection(selectionId: number) {
    this.selectedDeck = this.decks[selectionId];
    GameSettingsUtils.prepareGameSettingsForm(this.gameSettingsForm, this.selectedDeck.defaultGameSettings);
  }

  onSubmitOrCancel(event: boolean) {
    if (!event) {
      this.popupService.dismissModal();
    } else {
      this.startGame();
    }
  }

  startGame() {
    let speficiPlayerId = null;
    if (
      this.specificPersonModeRequired() || 
      this.specificPersonModeAvailable() &&
      this.gameSettingsForm.controls["specificPlayerActivated"].value &&
      this.gameSettingsForm.controls["specificPlayerId"].value != null
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
    this.popupService.dismissModal();
  }

}
