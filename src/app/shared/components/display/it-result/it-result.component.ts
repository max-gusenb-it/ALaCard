import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardType } from 'src/app/core/models/enums';
import { Result } from 'src/app/core/models/interfaces';
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
  @Input() type: CardType;

  constructor(
    private translateService: TranslateService,
    private changeDetectornRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.cardService = CardUtils.getCardService(this.type);
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

}
