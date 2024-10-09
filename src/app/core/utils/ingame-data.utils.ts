import firebase from 'firebase/compat/app';
import { Deck, IngameData, Round } from "../models/interfaces";
import { CardUtilFactory } from './cards/cardUtilsFactory';

export namespace IngameDataUtils {
    export function createInitialIngameData(deck: Deck) : IngameData {
        let ingameData: IngameData = {
            creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
            playedCardIndexes: [],
            rounds: [],
        };
        if (!!!deck.groundRules || deck.groundRules.length === 0) {
            ingameData.rounds = [createGameRound(deck, ingameData)];
        }
        return ingameData;
    }

    export function createGameRound(deck: Deck, ingameData: IngameData) : Round {
        const unplayedCards = Array.from(Array(deck.cards.length).keys())
            .filter(i => !ingameData.playedCardIndexes.includes(i));
        
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
        const utils = CardUtilFactory.getCardUtils(card.type);
        
        return utils.createGameRound({
            id: ingameData.playedCardIndexes.length,
            cardIndex: newCardIndex,
            processed: false
        });
    }
}