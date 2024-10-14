import { CardService } from "./card.service";

export class FreeTextCardService extends CardService<Response> {
}

export const FTCardService = new FreeTextCardService();