import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'ground-rules',
  templateUrl: './ground-rules.component.html',
  styleUrls: ['./ground-rules.component.scss']
})
export class GroundRulesComponent implements AfterViewInit {

  rulesRead: boolean = false;

  currentRuleIndex: number = 0;

  @Input() deckname: string;
  @Input() groundRules: string[];

  @Output() onRulesRead: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngAfterViewInit() {
    if (this.groundRules.length === 1) {
      this.emitRulesRead();
    }
  }

  nextRule() {
    if (this.currentRuleIndex < (this.groundRules.length - 1)) {
      this.currentRuleIndex++;
    }
    if (this.currentRuleIndex + 1 === this.groundRules.length && !this.rulesRead) {
      this.emitRulesRead();
    }
  }

  emitRulesRead() {
    this.rulesRead = true;
    firstValueFrom(timer(this.groundRules[this.currentRuleIndex].length * 100))
      .then(() => this.onRulesRead.emit(true));
  }

}
