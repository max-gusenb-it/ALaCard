import { DynamicRoundData, Response } from "src/app/core/models/interfaces";
import { CardService } from "./card.service";

export class FreeTextCardService extends CardService<Response, DynamicRoundData> {
}

export const FTCardService = new FreeTextCardService();