import { Card } from "../cards/Card";

export interface Deck {
    name: string;
    icon: string;
    cards: Card[];
}