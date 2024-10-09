import { Card } from "../cards/card";

export interface Deck {
    name: string;
    description: string;
    icon: string;
    cards: Card[];
    groundRules?: string[];
    
    speficPlayerMandatory: boolean;
}