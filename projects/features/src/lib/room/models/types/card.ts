import { CardService, DynamicRoundData, Response, Result, CardTranslationService, VotingCardTranslationService, PollCardService } from "@features";
import { Card, PlayerVotingCard, PollCard, VotingCard } from "@shared";
import { PlayerVotingCardService } from "../../logic/service/cards/player-voting-card.service";
import { PollCardTranslationService } from "../../logic/service/cards/translation/poll-card-translation.service";

export type GameCardService = CardService<Card, Response, DynamicRoundData, Result> | PollCardService | PlayerVotingCardService;
export type GameCard = Card | PlayerVotingCard | PollCard;

export type GameCardTranslationService = CardTranslationService<Card> | VotingCardTranslationService<VotingCard> | PollCardTranslationService;