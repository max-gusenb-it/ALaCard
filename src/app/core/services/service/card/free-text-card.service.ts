import { DynamicRoundData, Response, Result } from "src/app/core/models/interfaces";
import { CardService } from "./card.service";

export class FreeTextCardService extends CardService<Response, DynamicRoundData, Result> {
}

export const FTCardService = new FreeTextCardService();