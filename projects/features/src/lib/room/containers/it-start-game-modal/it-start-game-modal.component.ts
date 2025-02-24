import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import {
  AngularLifecycle,
  Deck,
  speficiPlayerIdSettingName,
  PopupService
} from '@shared';
import {
  Player,
  GameSettings,
  StaticRoundDataUtils,
  GameSettingsUtils,
  IngameDataDataService,
  RoomActions,
  RoomState,
  DeckState,
} from '@features';

@Component({
  selector: 'it-start-game-modal',
  templateUrl: './it-start-game-modal.component.html'
})
export class ItStartGameModal extends AngularLifecycle {

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

  get decksTabId() {
    return "decks";
  }

  get settingsTabId() {
    return "settings";
  } 

  constructor(
    private store: Store,
    private popupService: PopupService,
    private translateService: TranslateService,
    private ingameDataDataService: IngameDataDataService
  ) {
    super();

    this.store.select(RoomState.players)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => this.players = p);
  }

  onNavigation(event: string) {
    if (this.currentTab !== this.settingsTabId && event === this.settingsTabId && GameSettingsUtils.areSettingsPreset(this.selectedDeck.defaultGameSettings)) {
      this.startGame();
      return;
    }
    this.currentTab = event;
    if (event === this.settingsTabId) {
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
    
    if (!StaticRoundDataUtils.isDeckPlayable(this.selectedDeck, this.ingameDataDataService.getActivePlayerIds().length, gameSettings)) {
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
