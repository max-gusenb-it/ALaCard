import firebase from 'firebase/compat/app';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fireDate'
})
export class FireDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value?: firebase.firestore.Timestamp, ...args: string[]): unknown {
    if (value !== undefined && value.seconds !== null && value.nanoseconds !== null) {
      return this.datePipe.transform(new firebase.firestore.Timestamp(value.seconds, value.nanoseconds).toDate(), args.length === 1 ? args[0] : 'dd.MM.yyyy');
    }
    return null;
  }

}
