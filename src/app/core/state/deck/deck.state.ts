import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { DeckStateModel } from "./deck.model";
import { Injectable } from "@angular/core";
import { Deck } from "../../models/interfaces";
import { DeckActions } from "./deck.actions";
import { CardType } from "../../models/enums";
import { PlayerVotingCard } from "../../models/interfaces/logic/cards/playerVotingCard/player-voting-card";
import { environment } from "src/environments/environment";

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
                    text: "Erster :) - %p0 is a echter Wappla",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 1,
                        selfVoteDisabled: true
                    }
                } as PlayerVotingCard,
                {
                    text: "Zweiter :)",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 2
                    }
                } as PlayerVotingCard
            ],
            speficPlayerMandatory: false
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
                    text: "Erster :) - %p0 is a echter Wappla",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 1
                    }
                } as PlayerVotingCard,
                {
                    text: "Zweiter :)",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 2

                    }
                } as PlayerVotingCard
            ],
            groundRules: [
                "- No drinking with the left hand  \n- No one is allowed to say the words: ’yes’, ‘no’ and ‘you’  \n- Rule violation = 1 sip",
                "The winner is the last one standing :*",
                "Don't drink too much ;)",
                "Don't forget to **have fun** :)"
            ],
            speficPlayerMandatory: false
        };

        const partyDeckWithSpMandatory: Deck = {
            icon: "🎉",
            name: "Party Game with sp mandatory",
            description: "Very funny Party Game for your whole family",
            cards: [
                {
                    text: "Bitte zeige diese Karte an",
                    type: CardType.PlayerVoting
                } as PlayerVotingCard,
                {
                    text: "Erster :) - %sp is a echter Wappla",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 1
                    }
                } as PlayerVotingCard,
                {
                    text: "Zweiter :)",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 2

                    }
                } as PlayerVotingCard
            ],
            speficPlayerMandatory: true
        };

        const partyDeckWithRulesAndSp: Deck = {
            icon: "🎉",
            name: "Party Game with Rules and sp",
            description: "Very funny Party Game for your whole family",
            cards: [
                {
                    text: "Bitte zeige diese Karte an",
                    type: CardType.PlayerVoting
                } as PlayerVotingCard,
                {
                    text: "Erster :) - %sp und %p0 san echter Wappla",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 1
                    }
                } as PlayerVotingCard,
                {
                    text: "Zweiter :)",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 2

                    }
                } as PlayerVotingCard
            ],
            groundRules: [
                "- No drinking with the left hand  \n- No one is allowed to say the words: ’yes’, ‘no’ and ‘you’  \n- Rule violation = 1 sip",
                "The winner is the last one standing :*",
                "Don't drink too much ;)",
                "Don't forget to **have fun** :)"
            ],
            speficPlayerMandatory: false
        };
        
        const leggitPartyDeck: Deck = {
            icon: "🎉",
            name: "Party Game",
            description: "Very funny Party Game",
            cards: [
                {
                    text: "%p0 thanks for testing out my game :)",
                    type: CardType.PlayerVoting,
                    settings: {
                        order: 1
                    }
                } as PlayerVotingCard
            ],
            groundRules: [
                "- **Reminder**  \n- The game is currently under development so the features are limited"
            ],
            speficPlayerMandatory: false
        };

        if (environment.production) {
            decks = [leggitPartyDeck];
        } else {
            decks = [
                partyDeck, partyDeckWithRules, partyDeckWithSpMandatory, partyDeckWithRulesAndSp
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