import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { RoomState, CardServiceFactory, Player, CardUtils, ColorUtils, GameCardTranslationService } from '@features';
import { AngularLifecycle, Card, Color } from '@shared';

@Component({
  selector: 'it-card',
  templateUrl: './it-card.component.html',
  styleUrls: ['./it-card.component.scss']
})
export class ItCardComponent extends AngularLifecycle implements AfterViewInit {

  players: Player[];

  @Input() card: Card;
  @Input() deckname: string = "";
  @Input() playerIds?: string[];
  @Input() customColor?: Color;
  @Input() customTitle?: string;
  @Input() offline?: boolean;
  @Input() hideDeckName?: boolean;
  @Input() cardState: string;

  @Output() onSwipe: EventEmitter<boolean> = new EventEmitter();
  @Output() onClick: EventEmitter<boolean> = new EventEmitter();

  touchStartX = 0;
  touchEndX = 0;

  get cardTranslationService() : GameCardTranslationService {
    return this.cardServiceFactory.getCardTranslationService(this.card.type);
  }

  constructor(
    private store: Store,
    private cardServiceFactory: CardServiceFactory,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();

    this.store.select(RoomState.players)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => this.players = p);
  }

  ngAfterViewInit(): void {
    if (!this.customColor && this.card.settings?.customColor) this.customColor = this.card.settings.customColor;
    if (!this.customTitle && this.card.settings?.customTitle) this.customTitle = this.card.settings.customTitle;
    this.changeDetectorRef.detectChanges();
  }

  getBorderCSSClasses() {
    const color = CardUtils.getCardColor(this.card);
    return ColorUtils.getCardBorderCSS(color);
  }

  getTitleBackgroundCSSClasses() {
    const color = CardUtils.getCardColor(this.card);
    return ColorUtils.getBackground200CSS(color);
  }

  getCardText() {
    return this.cardTranslationService.getCardText(
      this.card,
      this.store.selectSnapshot(RoomState.players),
      this.playerIds ?? [],
      this.store.selectSnapshot(RoomState.specificPlayerId) ?? "",
      this.cardState,
      this.store.selectSnapshot(RoomState.singleDeviceModeActive),
      this.store.selectSnapshot(RoomState.gameSettings)!.drinkingGame
    )
  }

  getOfflineTextCSSClasses() {
    return this.cardTranslationService.getOfflineCardTextClasses();
  }

  cardClicked(event: MouseEvent) {
    this.onClick.emit(event.clientX <= window.innerWidth / 2);
  }

  @HostListener('touchstart', ['$event']) handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event']) handleTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.checkDirection();
  }

  checkDirection() {
    if (this.touchEndX < this.touchStartX && (this.touchStartX - this.touchEndX) >= 100) this.onSwipe.emit(true);
    if (this.touchEndX > this.touchStartX && (this.touchEndX - this.touchStartX) >= 100) this.onSwipe.emit(false);
  }

  getCardTitle() {
    return this.cardTranslationService.getCardTitle(this.card);
  }

}
