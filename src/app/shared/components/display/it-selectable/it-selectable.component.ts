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
        this.emitSelection();
    }

    emitSelection() {
        this.selectionEmitter.emit(this.id);
    }

    unselect() {
        this.selected = false;
    }

    select() {
        this.selected = true;
    }

    detectChanges() {
        this.changeDetectionRef.detectChanges();
    }
}