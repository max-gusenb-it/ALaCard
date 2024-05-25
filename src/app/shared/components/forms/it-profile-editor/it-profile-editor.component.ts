import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { IProfileEditorData } from 'src/app/core/models/interfaces/components/forms/it-profile-editor/IProfileEditorData';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'it-profile-editor',
  templateUrl: './it-profile-editor.component.html'
})
export class ItProfileEditorComponent extends AngularLifecycle {

  @Output() profileFormChanged: EventEmitter<IProfileEditorData> = new EventEmitter();

  profileForm = new FormGroup({
    username: new FormControl({value: "", disabled: false}, [Validators.required]),
  });

  constructor() {
    super();
    this.profileForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(c => {
        this.profileFormChanged.emit({
          username: c.username,
          profilePicture: null,
          valid: this.profileForm.valid
        });
    });
  }

}
