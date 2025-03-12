import { Card, CardType, Color, systemDefaultValue, Utils } from "@shared";

export namespace CardUtils {
    export function castCard<C extends Card>(card: Card) : C {
        return <C> card;
    }

    export function getCardColor(card: Card) : Color {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.customColor)) {
            return card.settings?.customColor!;
        } else {
            switch(card.type) {
              case(CardType.NewPlayerVotingCard): {
                return "red"
              }
              case(CardType.PollCard): {
                return "blue"
              }
              case(CardType.QuizCard): {
                return "green"
              }
              default: {
                return systemDefaultValue;
              }
            }
        }
    }
}