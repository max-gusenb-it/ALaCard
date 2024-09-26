import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    template: ''
})
export abstract class ItSelectableComponent {
    @Input() selected: boolean = false;

    @Output() selectionEmitter: EventEmitter<number> = new EventEmitter();

    constructor(private changeDetectionRef: ChangeDetectorRef) { }

    id: number = null as any;

    toggleState() {
        if (this.selected) {
            this.unselect();
        } else {
            this.select();
        }
    }

    emitSelection() {
        this.selectionEmitter.emit(this.id);
    }

    quietUnselect() {
        this.selected = false;
    }

    quietSelect() {
        this.selected = true;
    }

    unselect() {
        this.quietUnselect();
        this.emitSelection();
    }

    select() {
        this.quietSelect();
        this.emitSelection();
    }

    detectChanges() {
        this.changeDetectionRef.detectChanges();
    }
}