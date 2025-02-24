import { AfterViewInit, Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, take, takeUntil, timer } from 'rxjs';
import { RoomState, slideToggle, ResponseDataSourceService, StaticRoundDataDataService, } from '@features';
import {
  AuthenticationState,
  CardType,
  FreeTextCard,
  InformationActions,
  InformationState,
  TutorialService
} from '@shared';

const mobileRuleTutorialLabelId : string = "features.room.game.card.game-rules.mobile-tutorial";
const desktopRuleTutorialLabelId : string = "features.room.game.card.game-rules.desktop-tutorial";

@Component({
  selector: 'it-game-rules',
  templateUrl: './it-game-rules.component.html',
  styleUrls: ['./it-game-rules.component.scss'],
  animations: [slideToggle]
})
export class ItGameRulesComponent implements AfterViewInit {

  currentRuleIndex: number = 0;

  @Input() deckname: string;
  @Input() groundRules: string[];

  protected animationDirection: "right" | "left" = "right";

  constructor(
    private store: Store,
    private responseDataSourceService: ResponseDataSourceService,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private tutorialService: TutorialService
  ) {
    this.currentRuleIndex = this.store.selectSnapshot(InformationState.gameRulesCardIndex);
  }

  ngAfterViewInit() {
    if (this.groundRules.length === 1) {
      this.emitRulesRead();
    }

    this.tutorialService.checkForDualTutorial(
      mobileRuleTutorialLabelId,
      desktopRuleTutorialLabelId
    );
  }

  getCard() : FreeTextCard {
    return {
      type: CardType.GroundRule,
      text: this.groundRules[this.currentRuleIndex]
    }
  }

  navigate(direction: boolean) {
    if (direction) {
      this.nextRule();
    } else {
      this.previousRule();
    }
    this.store.dispatch(new InformationActions.SetGameRulesCardIndex(this.currentRuleIndex));
  }

  nextRule() {
    this.animationDirection = "right";
    if (this.currentRuleIndex < (this.groundRules.length - 1)) {
      this.currentRuleIndex = this.currentRuleIndex + 1;
    }
    if (this.currentRuleIndex + 1 === this.groundRules.length) {
      this.emitRulesRead();
    }
  }

  previousRule() {
    this.animationDirection = 'left';
    if (this.currentRuleIndex > 0) {
      this.currentRuleIndex = this.currentRuleIndex - 1;
    }
  }

  emitRulesRead() {
    if (!this.store.selectSnapshot(RoomState.roomSettings)?.singleDeviceMode && !this.store.selectSnapshot(InformationState.gameRulesRead)) {
      this.store.dispatch(new InformationActions.GameRulesRead());
      timer(this.groundRules[this.currentRuleIndex].length * 50)
        .pipe(
          take(1),
          takeUntil(
            this.staticRoundDataDataService.getStaticRoundData$()
              .pipe(
                filter(srd => !!srd.round && srd.round.id !== -1),
                take(1)
              )
          )
        )
        .subscribe(() => {
          this.onRulesRead();
        });
    }
  }

  onRulesRead() {
    return this.responseDataSourceService.addResponse(
      this.store.selectSnapshot(RoomState.roomId)!,
      {
        roundId: -1,
        playerId: this.store.selectSnapshot(AuthenticationState.user)?.id!,
        skipped: false
      }
    );
  }

}
