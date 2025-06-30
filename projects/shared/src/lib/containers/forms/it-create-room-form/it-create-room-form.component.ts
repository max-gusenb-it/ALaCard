import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { AngularLifecycle, CreateRoomFormData, PopUpService } from '@shared';
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'it-create-room-form',
    templateUrl: './it-create-room-form.component.html'
})
export class ItCreateRoomForm extends AngularLifecycle implements AfterViewInit {

    @Input() createRoomFormData: CreateRoomFormData;

    @Output() roomFormChanged: EventEmitter<CreateRoomFormData> = new EventEmitter();
    @Output() onSubmit: EventEmitter<unknown> = new EventEmitter();

    roomForm: FormGroup = new FormGroup({
        name: new FormControl({ value: "", disabled: false }, [Validators.required, Validators.maxLength(30)]),
        mode: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
    });

    constructor(private popUpService: PopUpService, private translateService: TranslateService) {
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

    modeSelectionChanged(mode: number) {
        this.roomForm.controls['mode'].setValue(mode);
        if (mode === undefined) return;
        if (mode === 0) {
            this.popUpService.openSnackbar(this.translateService.instant("shared.components.forms.it-create-room-form.offline-snackbar"), 'check', undefined, false);
        } else {
            this.popUpService.openSnackbar(this.translateService.instant("shared.components.forms.it-create-room-form.online-snackbar"), 'check', undefined, false);
        }
    }

    emitRoomFormcChanges() {
        this.roomFormChanged.emit({
            name: this.roomForm.controls['name'].value!,
            mode: this.roomForm.controls['mode'].value!,
            valid: this.roomForm.valid 
        });
    }

    submit() {
        this.onSubmit.emit(null);
    }
}