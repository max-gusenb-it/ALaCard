import firebase from 'firebase/compat/app';
import { Deck, GameSettings, Player, Round, StaticRoundData } from "../models/interfaces";
import { CardUtils } from './card.utils';
import { Utils } from './utils';

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
        const newCardIndex = getNewCardIndex(deck, staticRoundData);        
        
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

    function getNewCardIndex(deck: Deck, staticRoundData: StaticRoundData) {
        const unplayedCardIndexes = Array.from(Array(deck.cards.length).keys())
            .filter(i => !staticRoundData.playedCardIndexes.includes(i));

        // ToDo: filter out playable cards -> user count

        const orderCardIndexes = unplayedCardIndexes.filter(index => deck.cards[index].settings?.order !== undefined);
        if (orderCardIndexes.length !== 0) {
            return orderCardIndexes.map(i => { return {
                cardOrder: deck.cards[i].settings!.order!,
                index: i
            }}).sort((c1, c2) => c1.cardOrder - c2.cardOrder)[0].index;
        } else {
            return Utils.getNFromArray(unplayedCardIndexes, 1)[0];
        }
    }
}