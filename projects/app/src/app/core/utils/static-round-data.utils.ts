import { Utils } from '../../../../../shared/src/lib/utils/utils/utils';
import { playerNameWhitecard, specificPlayerNameWhitecard } from '../../../../../shared/src/lib/utils/constants/card';
import { BaseCardUtils } from "./card/base-card.utils";
import { CardType, Deck, GameSettings, PlayerVotingCard } from '@shared';

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