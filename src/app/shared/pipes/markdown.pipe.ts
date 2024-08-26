import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  constructor() {}

  transform(value?: any): unknown {
    if (!!value && value.length > 0) {
        return marked.marked(value);
    }
    return value;
  }

}
