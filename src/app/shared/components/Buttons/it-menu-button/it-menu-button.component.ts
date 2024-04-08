import { Component } from "@angular/core";

@Component({
    selector: 'it-menu-button',
    templateUrl: './it-menu-button.component.html',
})
export class ItMenuButtonComponent {
    active: boolean = false;

    toggleActive() {
        this.active = !this.active;
    }
}