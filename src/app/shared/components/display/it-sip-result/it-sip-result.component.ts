import { Component, Input } from "@angular/core";
import { SipResult } from "src/app/core/models/interfaces";

@Component({
  selector: 'it-sip-result',
  templateUrl: './it-sip-result.component.html',
  styleUrl: './it-sip-result.component.scss'
})
export class ItSipResult {
    @Input() profilePicture: string;
    @Input() sipResult: SipResult;
}