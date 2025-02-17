import { Deck, GameSettings, PlayerVotingCard } from "../models/interfaces";
import { Utils } from './utils';
import { CardType } from '../models/enums';
import { playerNameWhitecard, specificPlayerNameWhitecard } from '../constants/card';
import { BaseCardUtils } from "./card/base-card.utils";

export namespace StaticRoundDataUtils {
    export function isDeckPlayable(deck: Deck, activePlayerCount: number, gameSettings: GameSettings) {
        return getPlayableCards(Array.from(Array(deck.cards.length).keys()), deck, activePlayerCount, gameSettings).length > 0;
    }

    export function getPlayableCards(availableCardIndexes: number[], deck: Deck, activePlayerCount: number, gameSettings: GameSettings) : number[] {
        return availableCardIndexes
            .filter(ci => gameSettings.drinkingGame || !deck.cards[ci].settings?.drinkingCard)
            .filter(ci => {
                const card = deck.cards[ci];
                let neededPlayerCount = Utils.countSubstrings(card.text, playerNameWhitecard) + Utils.countSubstrings(card.text, specificPlayerNameWhitecard);
                switch(card.type) {
                    case(CardType.PlayerVoting): {
                        let pvCard = BaseCardUtils.castCard<PlayerVotingCard>(card);
                        if (neededPlayerCount < 2 && pvCard.settings?.selfVoteDisabled) {
                            neededPlayerCount = 2;
                        }
                        break;
                    }
                }
                return activePlayerCount >= neededPlayerCount
            }
        );
    }
}