import { Injectable } from "@angular/core";
import { StaticRoundDataDataService } from "../data/static-round-data.data.service";

@Injectable({
    providedIn: 'root'
})
export class FollowUpCardService {
    constructor(private staticRoundDataDataService: StaticRoundDataDataService) { }

    get followUpIndex() : number {
        const staticRoundData = this.staticRoundDataDataService.getStaticRoundData();
        return staticRoundData?.round?.followUpCardIndex ?? 0;
    }

    isFollowUpRound() {
        return this.followUpIndex > 0;
    }
}