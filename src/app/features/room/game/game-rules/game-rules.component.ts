import { AfterViewInit, Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom, timer } from 'rxjs';
import { slideToggle } from 'src/app/core/animations/slideToggle';
import { CardType } from 'src/app/core/models/enums';
import { FreeTextCard } from 'src/app/core/models/interfaces/logic/cards/free-text-card/free-text-card';
import { TutorialService } from 'src/app/core/services/service/tutorial.service';
import { ResponseDataSourceService } from 'src/app/core/services/source/response-data.source.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
import { InformationActions, InformationState } from 'src/app/core/state/information';

const mobileRuleTutorialLabelId : string = "features.room.game.card.game-rules.mobile-tutorial";
const desktopRuleTutorialLabelId : string = "features.room.game.card.game-rules.desktop-tutorial";

@Component({
  selector: 'game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss'],
  animations: [slideToggle]
})
export class GameRulesComponent implements AfterViewInit {

  currentRuleIndex: number = 0;

  @Input() deckname: string;
  @Input() groundRules: string[];

  protected animationDirection: "right" | "left" = "right";

  constructor(
    private store: Store,
    private responseDataSourceService: ResponseDataSourceService,
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
      firstValueFrom(timer(this.groundRules[this.currentRuleIndex].length * 70))
        .then(() => this.onRulesRead());
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
