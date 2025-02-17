import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export class AngularLifecycle implements OnDestroy {
  private destroySubject = new Subject<unknown>();

  public get destroyed$() {
    return this.destroySubject.asObservable();
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
}