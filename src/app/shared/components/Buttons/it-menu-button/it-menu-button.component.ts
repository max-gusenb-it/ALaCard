import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'it-menu-button',
    templateUrl: './it-menu-button.component.html',
})
export class ItMenuButtonComponent implements OnInit {
    active: boolean = false;

    @Input() menuItemIcons: string[] = [];
    
    /**
     * When menu item is clicked, id of menu item is emitted
     * @date 4/15/2024 - 8:11:13 AM
     *
     * @type {number}
     */
    @Output() menuItemClicked = new EventEmitter<number>();

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        window.addEventListener('pointerdown', (ev) => {
            // Checks, whether clicks/touches happens outside of the menu button element
            if (!this.elementRef.nativeElement.contains(ev.target)) {
                if (this.active) this.toggleActive();
            }
        });
        
        console.log(this.menuItemIcons);
    }

    toggleActive() {
        this.active = !this.active;
    }

    onMenuItemClick(index: number) {
        this.toggleActive();
        this.menuItemClicked.emit(index);
    }
}