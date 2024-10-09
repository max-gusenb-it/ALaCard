import firebase from 'firebase/compat/app';
import { Deck, Round, StaticRoundData } from "../models/interfaces";
import { CardUtils } from './card-utils';

export namespace StaticRoundDataUtils {
    export function createInitialStaticRoundData(deck: Deck) : StaticRoundData {
        let ingameData: StaticRoundData = {
            creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
            round: null,
            playedCardIndexes: [],
        };
        if (!!!deck.groundRules || deck.groundRules.length === 0) {
            ingameData.round = createGameRound(deck, ingameData);
        }
        return ingameData;
    }

    export function createGameRound(deck: Deck, staticRoundData: StaticRoundData) : Round {
        const unplayedCards = Array.from(Array(deck.cards.length).keys())
            .filter(i => !staticRoundData.playedCardIndexes.includes(i));
        
        let newCardIndex : number;

        const orderCardIndexes = unplayedCards.filter(index => deck.cards[index].settings?.order !== undefined);
        if (orderCardIndexes.length !== 0) {
            newCardIndex = orderCardIndexes.map(i => { return {
                cardOrder: deck.cards[i].settings!.order!,
                index: i
            }}).sort((c1, c2) => c1.cardOrder - c2.cardOrder)[0].index;
        } else {
            newCardIndex = Math.floor(Math.random() * unplayedCards.length);
        }
        
        const card = deck.cards[newCardIndex];
        const utils = CardUtils.getCardService(card.type);
        
        return utils.createGameRound({
            id: staticRoundData.playedCardIndexes.length,
            cardIndex: newCardIndex,
            processed: false
        });
    }
}