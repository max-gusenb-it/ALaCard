import { NgModule } from '@angular/core';
import { MarkdownPipe } from './logic/pipes/markdown.pipe';

@NgModule({
    declarations: [
      MarkdownPipe
    ],
    imports: [
    ],
    exports: [
      MarkdownPipe
    ],
    providers: [
    ]
  })
  export class NewSharedModule { }