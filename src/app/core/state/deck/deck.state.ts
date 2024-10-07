import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { DeckStateModel } from "./deck.model";
import { Injectable } from "@angular/core";
import { Deck } from "../../models/interfaces";
import { DeckActions } from "./deck.actions";
import { CardType } from "../../models/enums";
import { PlayerVotingCard } from "../../models/interfaces/logic/cards/playerVotingCard/player-voting-card";

export const DECK_STATE_TOKEN = new StateToken<DeckStateModel>('deck');

@State<DeckStateModel>({
    name: DECK_STATE_TOKEN,
    defaults: {
        decks: []
    }
})
@Injectable()
export class DeckState implements NgxsOnInit {
    @Selector()
    static decks(state: DeckStateModel): Deck[] {
        return state.decks;
    }

    constructor() {

    }

    ngxsOnInit(ctx: StateContext<DeckStateModel>): void {
        let decks: Deck[] = [];

        const partyDeck: Deck = {
            icon: "🎉",
            name: "Party Game",
            description: "Very funny Party Game for your whole family",
            cards: [
                {
                    text: "Bitte zeige diese Karte an",
                    type: CardType.PlayerVoting
                } as PlayerVotingCard,
                {
                    text: "Erster :)",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 1
                    }
                } as PlayerVotingCard
            ]
        };

        const partyDeckWithRules: Deck = {
            icon: "🎉",
            name: "Party Game with Rules",
            description: "Very funny Party Game for your whole family",
            cards: [
                {
                    text: "Bitte zeige diese Karte an",
                    type: CardType.PlayerVoting
                } as PlayerVotingCard,
                {
                    text: "Erster :)",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 1
                    }
                } as PlayerVotingCard
            ],
            groundRules: [
                "- No drinking with the left hand  \n- No one is allowed to say the words: ’yes’, ‘no’ and ‘you’  \n- Rule violation = 1 sip",
                "The winner is the last one standing :*",
                "Don't drink too much ;)",
                "Don't forget to **have fun** :)"
            ]
        };

        decks = [
            partyDeck, partyDeckWithRules
        ];

        const state = ctx.getState();

        decks.forEach(deck => {
            let oldDeck = state.decks.find(d => d.name === deck.name);
            if (!!oldDeck && !!oldDeck.groundRules && !!deck.groundRules && oldDeck.groundRules.length !== deck.groundRules.length) {
                state.decks = state.decks.filter(d => d.name !== deck.name);
                oldDeck = undefined;
            }
            if (!!!oldDeck) {
                ctx.dispatch(new DeckActions.AddDeck(deck));
            }
        });
    }

    @Action(DeckActions.AddDeck)
    addDeck(ctx: StateContext<DeckStateModel>, action: DeckActions.AddDeck) {
        const state = ctx.getState();

        ctx.patchState({
            decks: [
                ...state.decks,
                action.deck
            ]
        });
    }
}