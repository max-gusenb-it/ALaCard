import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Card, Player, Result, SipResult } from 'src/app/core/models/interfaces';
import { CardService, GameCardService } from 'src/app/core/services/service/card/card.service';

@Component({
  selector: 'it-result',
  templateUrl: './it-result.component.html',
  styleUrls: ['./it-result.component.scss']
})
export class ItResultComponent implements AfterViewInit {

  baseCardService: GameCardService;

  @Input() result: Result;
  @Input() sipResult: SipResult;
  @Input() profilePicture?: string;
  @Input() username?: string;
  @Input() card: Card;
  @Input() players: Player[];
  @Input() overrideAnonymous: boolean = false;

  // ToDo: Refactor

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private changeDetectornRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (!!this.card) {
      this.baseCardService = this.cardService.getCardService(this.card.type);
      this.changeDetectornRef.detectChanges();
    }
  }

  skipped() {
    return !!!this.username;
  }

  getTitle() {
    return !this.skipped() ? 
      this.username : 
      this.translateService.instant("shared.components.display.it-result.skipped");
  }

  getResultText() {
    if (!!!this.sipResult) {
      return this.baseCardService.getResultText(this.result, this.translateService);
    } else {
      let text = this.sipResult.distribute ? 
        this.translateService.instant("shared.components.display.it-result.distribute") : 
        this.translateService.instant("shared.components.display.it-result.drink");
      text += ` ${this.sipResult.sips} `;
      text += this.sipResult.sips > 1 ? 
        this.translateService.instant("shared.components.display.it-result.sips") : 
        this.translateService.instant("shared.components.display.it-result.sip");
      return text;
    }
  }

  cardHasResultSubText() {
    return !!!this.sipResult && this.baseCardService.cardHasResultSubText(this.card, this.overrideAnonymous);
  }

  getResultSubText() {
    return this.baseCardService.getResultSubText(this.result, this.players);
  }

}
