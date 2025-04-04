import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { DeckStateModel } from "./deck.model";
import { Injectable } from "@angular/core";
import { DeckActions } from "./deck.actions";
import { environment } from "projects/app/src/environments/environment";
import { demoPartyDecks, leggitPartyDecks } from "../../../utils/constants/decks";
import { Deck } from "@shared";

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

    constructor() { }

    ngxsOnInit(ctx: StateContext<DeckStateModel>): void {
        let decks: Deck[] = [];

        if (environment.production) {
            decks = leggitPartyDecks;
        } else {
            decks = [
                ...leggitPartyDecks,
                ...demoPartyDecks
            ];
        }

        ctx.dispatch(new DeckActions.SetDecks(decks));
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

    @Action(DeckActions.SetDecks)
    setDecks(ctx: StateContext<DeckStateModel>, action: DeckActions.SetDecks) {
        const state = ctx.getState();

        ctx.patchState({
            decks: [
                ...action.decks
            ]
        });
    }
}