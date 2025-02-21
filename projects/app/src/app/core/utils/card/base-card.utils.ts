import { Card } from "@shared";

export namespace BaseCardUtils {
    export function castCard<C extends Card>(card: Card) : C {
        return <C> card;
    }
}