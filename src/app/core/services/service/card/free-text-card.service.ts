import { DynamicRoundData, FreeTextCard, Response, Result } from "src/app/core/models/interfaces";
import { CardService } from "./card.service";

export class FreeTextCardService extends CardService<FreeTextCard, Response, DynamicRoundData, Result> {
}

export const FTCardService = new FreeTextCardService();