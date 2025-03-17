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
              case(CardType.PlayerVoting): {
                return "red"
              }
              case(CardType.Poll): {
                return "blue"
              }
              case(CardType.Quiz): {
                return "green"
              }
              default: {
                return systemDefaultValue;
              }
            }
        }
    }

    export function isInitialCardState(cardState: string) {
      return cardState.endsWith("_Initial");
    }
}