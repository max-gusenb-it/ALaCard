import { NgModule } from '@angular/core';
import { MarkdownPipe } from './logic/pipes/markdown.pipe';
import { FireDatePipe } from './logic/pipes/fire-date.pipe';

@NgModule({
    declarations: [
      MarkdownPipe,
      FireDatePipe
    ],
    imports: [
    ],
    exports: [
      MarkdownPipe,
      FireDatePipe
    ],
    providers: [
    ]
  })
  export class NewSharedModule { }