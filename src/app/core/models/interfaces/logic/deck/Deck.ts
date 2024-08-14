import { Card } from "../cards/Card";

export interface Deck {
    name: string;
    description: string;
    icon: string;
    cards: Card[];
    groundRules?: string[];
}