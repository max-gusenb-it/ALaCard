import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { ProfileEditorFormData } from 'projects/app/src/app/core/models/interfaces';
import { AngularLifecycle } from '@shared';

@Component({
  selector: 'it-profile-editor',
  templateUrl: './it-profile-editor-form.component.html'
})
export class ItProfileEditorComponent extends AngularLifecycle implements AfterViewInit {

  @Input() profileEditorFormData: ProfileEditorFormData = null as any;
  @Input() isRegistered: boolean = false;

  @Output() profileEditorFormChanged: EventEmitter<ProfileEditorFormData> = new EventEmitter();

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
    this.profileForm.controls['username'].setValue(this.profileEditorFormData.username ? this.profileEditorFormData.username : null);
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
