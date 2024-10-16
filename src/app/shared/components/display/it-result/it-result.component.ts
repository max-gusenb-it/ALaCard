import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Card, Player, Result } from 'src/app/core/models/interfaces';
import { CardUtils } from 'src/app/core/utils/card.utils';

@Component({
  selector: 'it-result',
  templateUrl: './it-result.component.html',
  styleUrls: ['./it-result.component.scss']
})
export class ItResultComponent implements AfterViewInit {

  cardService: CardUtils.CardService;

  @Input() result: Result;
  @Input() profilePicture?: string;
  @Input() username?: string;
  @Input() card: Card;
  @Input() players: Player[];

  constructor(
    private translateService: TranslateService,
    private changeDetectornRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.cardService = CardUtils.getCardService(this.card.type);
    this.changeDetectornRef.detectChanges();
  }

  skipped() {
    return !!!this.username;
  }

  getTitle() {
    return !this.skipped() ? this.username : this.translateService.instant("shared.components.display.it-result.skipped");
  }

  getResultText() {
    return this.cardService.getResultText(this.result, this.translateService);
  }

  cardHasResultSubText() {
    return this.cardService.cardHasResultSubText(this.card);
  }

  getResultSubText() {
    return this.cardService.getResultSubText(this.result, this.players);
  }

}
