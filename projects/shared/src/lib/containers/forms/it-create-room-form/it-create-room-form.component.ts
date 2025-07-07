import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { AngularLifecycle, CreateRoomFormData, InformationActions, PopUpService } from '@shared';
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";

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
        singleDeviceMode: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
    });

    constructor(
        private store: Store,
        private popUpService: PopUpService,
        private translateService: TranslateService
    ) {
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

    modeSelectionChanged(singleDeviceMode: number) {
        this.roomForm.controls['singleDeviceMode'].setValue(singleDeviceMode == 1);
        if (singleDeviceMode === undefined) return;
        if (singleDeviceMode === 1) {
            this.popUpService.openSnackbar(this.translateService.instant("shared.components.forms.it-create-room-form.offline-snackbar"), 'check', undefined, false);
        } else {
            this.popUpService.openSnackbar(this.translateService.instant("shared.components.forms.it-create-room-form.online-snackbar"), 'check', undefined, false);
        }
        this.store.dispatch(new InformationActions.SetJoinedInSingleDeviceMode(singleDeviceMode === 1));
    }

    emitRoomFormcChanges() {
        this.roomFormChanged.emit({
            name: this.roomForm.controls['name'].value!,
            singleDeviceMode: this.roomForm.controls['singleDeviceMode'].value!,
            valid: this.roomForm.valid 
        });
    }

    submit() {
        this.onSubmit.emit(null);
    }
}