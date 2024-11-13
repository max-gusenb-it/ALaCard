import { Deck, GameSettings, Player } from "../models/interfaces";
import { Utils } from './utils';
import { CardType, PlayerState } from '../models/enums';
import { playerNameWhitecard, specificPlayerNameWhitecard } from '../constants/card';
import { PlayerVotingCardService } from '../services/service/card/player-voting-card.service';

export namespace StaticRoundDataUtils {
    export function isDeckPlayable(deck: Deck, players: Player[], gameSettings: GameSettings) {
        return getPlayableCards(Array.from(Array(deck.cards.length).keys()), deck, players, gameSettings).length > 0;
    }

    export function getPlayableCards(availableCardIndexes: number[], deck: Deck, players: Player[], gameSettings: GameSettings) : number[] {
        const activePlayerCount = players.filter(p => p.state === PlayerState.active || p.state === PlayerState.offline).length;
        return availableCardIndexes
            .filter(ci => gameSettings.drinkingGame || !deck.cards[ci].settings?.drinkingCard)
            .filter(ci => {
                const card = deck.cards[ci];
                let neededPlayerCount = Utils.countSubstrings(card.text, playerNameWhitecard) + Utils.countSubstrings(card.text, specificPlayerNameWhitecard);
                switch(card.type) {
                    case(CardType.PlayerVoting): {
                        const service = new PlayerVotingCardService();
                        let pvCard = service.castCard(card);
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