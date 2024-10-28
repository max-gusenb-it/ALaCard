import firebase from 'firebase/compat/app';
import { Deck, GameSettings, Player, Round, StaticRoundData } from "../models/interfaces";
import { CardUtils } from './card.utils';
import { Utils } from './utils';
import { PlayerState } from '../models/enums';
import { playerNameWhitecard, specificPlayerNameWhitecard } from '../constants/card';

export namespace StaticRoundDataUtils {
    export function createInitialStaticRoundData(deck: Deck, players: Player[], gameSettings: GameSettings) : StaticRoundData {
        let staticRoundData: StaticRoundData = {
            creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
            round: null,
            playedCardIndexes: [],
        };
        if (!!!deck.groundRules || deck.groundRules.length === 0) {
            staticRoundData.round = createGameRound(deck, staticRoundData, players, gameSettings);
            staticRoundData.playedCardIndexes = [staticRoundData.round.cardIndex]
        }
        return staticRoundData;
    }

    export function createGameRound(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) : Round {
        const newCardIndex = getNewCardIndex(deck, staticRoundData, players, gameSettings);        
        
        const card = deck.cards[newCardIndex];
        const cardService = CardUtils.getCardService(card.type);
        
        return cardService.createGameRound(
            {
                id: staticRoundData.playedCardIndexes.length,
                cardIndex: newCardIndex
            },
            card,
            players,
            gameSettings
        );
    }

    function getNewCardIndex(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) {
        let availableCardIndexes = Array.from(Array(deck.cards.length).keys())
            .filter(i => !staticRoundData.playedCardIndexes.includes(i));

        availableCardIndexes = getPlayableCards(availableCardIndexes, deck, players, gameSettings);

        const orderCardIndexes = availableCardIndexes.filter(index => deck.cards[index].settings?.order !== undefined);
        if (orderCardIndexes.length !== 0) {
            return orderCardIndexes.map(i => { return {
                cardOrder: deck.cards[i].settings!.order!,
                index: i
            }}).sort((c1, c2) => c1.cardOrder - c2.cardOrder)[0].index;
        } else {
            return Utils.getNFromArray(availableCardIndexes, 1)[0];
        }
    }

    export function isDeckPlayable(deck: Deck, players: Player[], gameSettings: GameSettings) {
        return getPlayableCards(Array.from(Array(deck.cards.length).keys()), deck, players, gameSettings).length > 0;
    }

    function getPlayableCards(availableCardIndexes: number[], deck: Deck, players: Player[], gameSettings: GameSettings) : number[] {
        const activePlayerCount = players.filter(p => p.state === PlayerState.active || p.state === PlayerState.offline).length;
        return availableCardIndexes
            .filter(ci => gameSettings.drinkingGame || !deck.cards[ci].settings?.drinkingCard)
            .filter(ci => {
                let neededPlayerCount = Utils.countSubstrings(deck.cards[ci].text, playerNameWhitecard) + Utils.countSubstrings(deck.cards[ci].text, specificPlayerNameWhitecard);
                return activePlayerCount >= neededPlayerCount
            }
        );
    }
}