import { Component, Input } from '@angular/core';

@Component({
  selector: 'it-detail-heading',
  templateUrl: './it-detail-heading.component.html'
})
export class ItDetailHeadingComponent {

  @Input() heading: string = "";
  @Input() subheading: string = "";
  @Input() detail: string | undefined;
  @Input() imageUrl: string = "";
  @Input() headingType: "h3" | "h4" = "h3";
  @Input() subheadingType: "xs" | "sm" = "xs";

  showHeading(tagType: string) {
    return tagType === this.headingType;
  }

  isSubheadingType(subtitleType: string) {
    return subtitleType === this.subheadingType;
  }

}
