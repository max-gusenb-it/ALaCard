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
            ingameData.rounds = [
                createGameRound(deck, ingameData)
            ];
        }
        return ingameData;
    }

    export function createGameRound(deck: Deck, ingameData: IngameData) : Round {
        const unplayedCards = Array.from(Array(deck.cards.length).keys())
            .filter(i => !ingameData.playedCardIndexes.includes(i));
        const newCardIndex = Math.floor(Math.random() * unplayedCards.length);
        const card = deck.cards[newCardIndex];
        const utils = CardUtilFactory.getCardUtils(card.type);
        return utils.createGameRound(card, {
            cardIndex: newCardIndex,
            id: ingameData.playedCardIndexes.length,
            processed: false
        });
    }
}