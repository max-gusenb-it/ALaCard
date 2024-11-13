import { DynamicRoundData, FreeTextCard, Response, Result } from "src/app/core/models/interfaces";
import { BaseCardService } from "./base-card.service";

export class FreeTextCardService extends BaseCardService<FreeTextCard, Response, DynamicRoundData, Result> {
}

export const FTCardService = new FreeTextCardService();