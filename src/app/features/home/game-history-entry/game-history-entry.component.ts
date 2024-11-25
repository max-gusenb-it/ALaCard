import { Component, Input } from "@angular/core";
import { GameHistoryEntry } from "src/app/core/models/interfaces";

@Component({
    selector: 'game-history-entry',
    templateUrl: './game-history-entry.component.html'
})
export class GameHistoryEntryComponent {
    @Input() gameHistoryEntry: GameHistoryEntry;
}