import { CardService, DynamicRoundData, PlayerVotingCardService, Response, TopicVotingCardService, Result, CardTranslationService, VotingCardTranslationService } from "@features";
import { Card, PlayerVotingCard, TopicVotingCard, VotingCard } from "@shared";

export type GameCardService = CardService<Card, Response, DynamicRoundData, Result> | PlayerVotingCardService | TopicVotingCardService<TopicVotingCard>;
export type GameCard = Card | PlayerVotingCard | TopicVotingCard;

export type GameCardTranslationService = CardTranslationService<Card> | VotingCardTranslationService<VotingCard>;