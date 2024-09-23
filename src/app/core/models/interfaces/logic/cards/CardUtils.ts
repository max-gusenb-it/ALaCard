import { Round } from "../game-data/Round";
import { Card } from "./Card";

export interface CardUtils {
    createGameRound(card: Card, baseRound: Round) : Round;
}