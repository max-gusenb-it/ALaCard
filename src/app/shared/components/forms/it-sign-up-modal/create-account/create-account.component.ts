import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { CreateAccountFormData } from 'src/app/core/models/interfaces/features/home/CreateAccountFormData';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html'
})
export class CreateAccountComponent extends AngularLifecycle implements AfterViewInit {

  @Input() createAccountFormData: CreateAccountFormData = null as any;

  @Output() createAccountFormChanges: EventEmitter<CreateAccountFormData> = new EventEmitter();

  createAccountForm = new FormGroup({
    register: new FormControl({value: true, disabled: false}),
    email: new FormControl({value: "", disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
    password: new FormControl({value: "", disabled: false}, [Validators.required, Validators.minLength(6)]),
  });

  constructor() {
    super();
    this.createAccountForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(c => {
        this.createAccountFormChanges.emit({
          register: c.register!,
          email: c.email!,
          password: c.password!,
          valid: this.createAccountForm.valid
        });
    });
  }

  ngAfterViewInit() {
    if (!!this.createAccountFormData) {
      this.createAccountForm.controls['register'].setValue(this.createAccountFormData.register);
      this.createAccountForm.controls['email'].setValue(this.createAccountFormData.email);
      this.createAccountForm.controls['password'].setValue(this.createAccountFormData.password);
    }
  }

}
