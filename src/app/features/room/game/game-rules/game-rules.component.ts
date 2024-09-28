import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom, timer } from 'rxjs';
import { InformationActions, InformationState } from 'src/app/core/state/information';

@Component({
  selector: 'game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss'],
  animations: [
    trigger('slideToggle', [
      transition('* => *', [
          group([
              query(':enter', style({ transform: 'translateX({{ enterStart }})', opacity: 0 })),
              query(':leave', [
                  animate('750ms ease-in-out', style({ transform: 'translateX({{ leaveEnd }})', opacity: 0 }))
              ], { optional: true }),
              query(':enter', [
                  animate('750ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
              ])
          ])
      ],
      { 
          params: {
              leaveEnd: '',
              enterStart: ''
          }
      })
    ])
  ]
})
export class GameRulesComponent implements AfterViewInit {

  currentRuleIndex: number = 0;

  @Input() deckname: string;
  @Input() groundRules: string[];

  protected animationDirection: "right" | "left" = "right";

  @Output() onRulesRead: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: Store) {
    this.currentRuleIndex = this.store.selectSnapshot(InformationState.gameRulesCardIndex);
  }

  ngAfterViewInit() {
    if (this.groundRules.length === 1) {
      this.emitRulesRead();
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
    if (!this.store.selectSnapshot(InformationState.gameRulesRead)) {
      console.log ("Emitting rules read");
      this.store.dispatch(new InformationActions.GameRulesRead());
      firstValueFrom(timer(this.groundRules[this.currentRuleIndex].length * 100))
        .then(() => this.onRulesRead.emit(true));
    }
  }

}
