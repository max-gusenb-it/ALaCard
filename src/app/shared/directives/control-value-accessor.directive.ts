import { AfterViewChecked, AfterViewInit, Directive, Inject, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, Validators, NgControl, FormControlName, FormGroupDirective, FormControlDirective } from '@angular/forms';
import { Subject, takeUntil, startWith, distinctUntilChanged, tap } from 'rxjs';

@Directive({
  selector: '[appControlValueAccessor]'
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() id = "";
  control: FormControl | undefined;
  isRequired = false;
  private isDisabled = false;
  private destroy$ = new Subject<void>();
  
  private onTouched!: () => T;

  constructor(@Inject(Injector) private injector: Injector) {}

  ngOnInit() {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  /**
   * Listens to changes and sets Error message, when control is not valid
   */
  ngAfterViewInit(): void {
    const input: any = document.getElementById(this.getId());

    if (input.nodeName === "SELECT" || input.nodeName === "INPUT") {
      this.control?.valueChanges
        .subscribe(v => {
          if (!this.control?.valid) {
            input.setCustomValidity("You gotta fill this out, yo!");
          } else {
            input.setCustomValidity("");
          }
      });
    }
  }

  getId() {
    return this.id;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
      }
    } catch (err) {
      this.control = new FormControl();
    }
  }

  /**
   * Called when value changes from the outside of the component
   * @param obj change
   */
  writeValue(value: T): void {
    if(this.control?.value === value) return;
    this.control
      ? this.control.setValue(value)
      : (this.control = new FormControl(value));
  }

  /**
   * Registers a callback function which is then used to notify about user changes (Typing in UI)
   * @param fn function
   */
  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.control.value),
        distinctUntilChanged(),
        tap((val) => fn(val))
      )
      .subscribe(() => this.control?.markAsUntouched());
  }

  /**
   * Registers a function which is used to set the touched state
   * @param fn function
   */ 
  registerOnTouched(fn: () => T): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
