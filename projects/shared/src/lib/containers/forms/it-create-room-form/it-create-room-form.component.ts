import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { AngularLifecycle, CreateRoomFormData } from '@shared';

@Component({
    selector: 'it-create-room-form',
    templateUrl: './it-create-room-form.component.html'
})
export class ItCreateRoomForm extends AngularLifecycle implements AfterViewInit {

    @Input() createRoomFormData: CreateRoomFormData;

    @Output() roomFormChanged: EventEmitter<CreateRoomFormData> = new EventEmitter();
    @Output() onSubmit: EventEmitter<unknown> = new EventEmitter();

    roomForm: FormGroup = new FormGroup({
        name: new FormControl({ value: "", disabled: false }, [Validators.required, Validators.maxLength(30)])
    });

    constructor() {
        super();

        this.roomForm.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.emitRoomFormcChanges());
    }

    ngAfterViewInit() {
        if (!!this.createRoomFormData) {
            this.roomForm.controls['name'].setValue(this.createRoomFormData.name);
        }
    }

    emitRoomFormcChanges() {
        this.roomFormChanged.emit({
            name: this.roomForm.controls['name'].value!,
            valid: this.roomForm.valid 
        });
    }

    submit() {
        this.onSubmit.emit(null);
    }
}