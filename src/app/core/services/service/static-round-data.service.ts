import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Deck, GameSettings, Player, Round, StaticRoundData } from "../../models/interfaces";
import { StaticRoundDataUtils } from '../../utils/static-round-data.utils';
import { Utils } from '../../utils/utils';
import { CardService } from './card/card.service';

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataService {
    constructor(
        private cardService: CardService
    ) { }

    createInitialStaticRoundData(deck: Deck, players: Player[], gameSettings: GameSettings) : StaticRoundData {
        let staticRoundData: StaticRoundData = {
            creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
            round: null,
            playedCardIndexes: [],
        };
        if (!!!deck.groundRules || deck.groundRules.length === 0) {
            staticRoundData.round = this.createGameRound(deck, staticRoundData, players, gameSettings);
            staticRoundData.playedCardIndexes = [staticRoundData.round.cardIndex]
        }
        return staticRoundData;
    }

    createGameRound(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) : Round {
        const newCardIndex = this.getNewCardIndex(deck, staticRoundData, players, gameSettings);        
        
        const card = deck.cards[newCardIndex];
        const cardService = this.cardService.getCardService(card.type);
        
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
    
    private getNewCardIndex(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) {
        let availableCardIndexes = Array.from(Array(deck.cards.length).keys())
            .filter(i => !staticRoundData.playedCardIndexes.includes(i));

        availableCardIndexes = StaticRoundDataUtils.getPlayableCards(availableCardIndexes, deck, players, gameSettings);

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
}