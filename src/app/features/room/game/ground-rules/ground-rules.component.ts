import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'ground-rules',
  templateUrl: './ground-rules.component.html',
  styleUrls: ['./ground-rules.component.scss'],
  animations: [
    trigger('slideToggle', [
      transition('* => *', [
          group([
              query(':enter', style({ transform: 'translateX({{ enterStart }})' })),
              query(':leave', [
                  animate('750ms ease-in-out', style({ transform: 'translateX({{ leaveEnd }})' }))
              ], { optional: true }),
              query(':enter', [
                  animate('750ms ease-in-out', style({ transform: 'translateX(0)' }))
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
export class GroundRulesComponent implements AfterViewInit {

  rulesRead: boolean = false;

  currentRuleIndex: number = 0;

  @Input() deckname: string;
  @Input() groundRules: string[];

  protected animationDirection: "right" | "left" = "right";

  @Output() onRulesRead: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngAfterViewInit() {
    if (this.groundRules.length === 1) {
      this.emitRulesRead();
    }
  }

  swipe(direction: boolean) {
    if (direction) {
      this.nextRule();
    } else {
      this.previousRule();
    }
  }

  nextRule() {
    this.animationDirection = "right";
    if (this.currentRuleIndex < (this.groundRules.length - 1)) {
      this.currentRuleIndex = this.currentRuleIndex + 1;
    }
    if (this.currentRuleIndex + 1 === this.groundRules.length && !this.rulesRead) {
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
    this.rulesRead = true;
    firstValueFrom(timer(this.groundRules[this.currentRuleIndex].length * 100))
      .then(() => this.onRulesRead.emit(true));
  }

}
