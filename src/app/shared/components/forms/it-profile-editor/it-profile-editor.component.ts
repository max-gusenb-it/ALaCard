import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { IProfileEditorFormData } from 'src/app/core/models/interfaces/components/forms/it-profile-editor/IProfileEditorFormData';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'it-profile-editor',
  templateUrl: './it-profile-editor.component.html'
})
export class ItProfileEditorComponent extends AngularLifecycle implements AfterViewInit {

  @Input() profileEditorFormData: IProfileEditorFormData = null as any;

  @Output() profileEditorFormChanged: EventEmitter<IProfileEditorFormData> = new EventEmitter();

  isRegistered: boolean = false;
  profileForm = new FormGroup({
    username: new FormControl({value: "", disabled: false}, [Validators.required]),
  });
  profilePicture: string = "";

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
    this.profileForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => this.emitProfileChanges());
  }

  ngAfterViewInit(): void {
    this.isRegistered = !!this.profileEditorFormData.username;
    this.profileForm.controls['username'].setValue(!!this.profileEditorFormData.username ? this.profileEditorFormData.username : null);
    this.changeDetectorRef.detectChanges();
  }

  setProfilePicture(drawing: string) {
    this.profilePicture = drawing;
    this.emitProfileChanges();
  }

  emitProfileChanges() {
    this.profileEditorFormChanged.emit({
      username: this.profileForm.controls['username'].value!,
      profilePicture: this.profilePicture,
      valid: this.profileForm.valid && !!this.profilePicture
    })
  }

}
