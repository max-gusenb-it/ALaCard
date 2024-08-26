import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { DeckStateModel } from "./deck.model";
import { Injectable } from "@angular/core";
import { Deck } from "../../models/interfaces";
import { DeckActions } from "./deck.actions";
import { CardType } from "../../models/enums";
import { PlayerVotingCard } from "../../models/interfaces/logic/cards/playerVotingCard/PlayerVotingCard";

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
            ],
            groundRules: [
                "- No drinking with the left hand  \n- No one is allowed to say the words: ’yes’, ‘no’ and ‘you’  \n- Rule violation = 1 sip",
                "Don't forget to **have fun** :)"
            ]
        };

        decks = [
            partyDeck
        ];

        const state = ctx.getState();

        decks.forEach(deck => {
            if (!!!state.decks.find(d => d.name === deck.name)) {
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