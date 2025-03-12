import { CardService, DynamicRoundData, Response, Result, CardTranslationService, VotingCardTranslationService, PollCardService } from "@features";
import { Card, NewPlayerVotingCard, PollCard, VotingCard } from "@shared";
import { NewPlayerVotingCardService } from "../../logic/service/cards/new-player-voting-card.service";
import { PollCardTranslationService } from "../../logic/service/cards/translation/poll-card-translation.service";

export type GameCardService = CardService<Card, Response, DynamicRoundData, Result> | PollCardService | NewPlayerVotingCardService;
export type GameCard = Card | NewPlayerVotingCard | PollCard;

export type GameCardTranslationService = CardTranslationService<Card> | VotingCardTranslationService<VotingCard> | PollCardTranslationService;