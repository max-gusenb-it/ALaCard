import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    template: ''
})
export abstract class Selectable {
    @Input() selected: boolean = false;

    @Output() selectionEmitter: EventEmitter<number> = new EventEmitter();

    id: number = null as any;

    toggleState() {
        if (this.selected) {
            this.unselect();
        } else {
            this.select();
        }
    }

    unselect() {
        this.selected = false;
    }

    select() {
        this.selected = true;
        this.selectionEmitter.emit(this.id);
    }
}