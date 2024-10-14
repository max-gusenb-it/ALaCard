import { Injectable } from "@angular/core";
import { playerNameWhitecard, specificPlayerNameWhitecard } from "src/app/core/constants/card";
import { PlayerState } from "src/app/core/models/enums";
import { Card, DynamicRoundData, GameSettings, Player, Response, Result, Round } from "src/app/core/models/interfaces";
import { Utils } from "src/app/core/utils/utils";

@Injectable({
    providedIn: 'root'
})
export class CardService<R extends Response, D extends DynamicRoundData, T extends Result> {
    createGameRound(baseRound: Round, card: Card, players: Player[], gameSettings: GameSettings) : Round {
        players = players.filter(p => p.state === PlayerState.active || p.state === PlayerState.offline);

        let playerWhiteCardCount = Utils.countSubstrings(card.text, playerNameWhitecard);
        if (card.text.includes(specificPlayerNameWhitecard) && !!!gameSettings.speficiPlayerId) {
            playerWhiteCardCount = playerWhiteCardCount + 1;    
        }

        if (playerWhiteCardCount > 0) {
            baseRound.playerIds = Utils.getNFromArray(players.map(p => p.id), playerWhiteCardCount, !!gameSettings.speficiPlayerId ? [gameSettings.speficiPlayerId] : [])
        }
        return baseRound;
    }

    getCardText(card: Card, players: Player[], playerIds: string[] = [], speficPlayerId?: string) : string {
        let text = card.text;

        if (card.text.includes(specificPlayerNameWhitecard)) {
            if (!!speficPlayerId) {
                text = text.split(`${specificPlayerNameWhitecard}`).join(players.find(p => p.id === speficPlayerId)?.username);
            } else {
                text = text.replace(specificPlayerNameWhitecard, `${playerNameWhitecard}${playerIds.length - 1}`);
            }
        }
        
        if (playerIds.length > 0) {
            playerIds.forEach((playerId, index) => {
                text = text.split(`${playerNameWhitecard}${index}`).join(players.find(p => p.id === playerId)?.username);
            });
        }
        return text;
    }

    castResponse(response: Response | null) : R {
        return <R> response;
    }

    castResponses(responses: Response[]) : R[] {
        return <R[]> responses;
    }

    createDynamicRoundData(roundId: number, responses: Response[]) : D {
        return {
            roundId: roundId,
            processed: true
        } as D;
    }

    castDynamicRoundData(dynamicRoundData: DynamicRoundData) : D {
        return <D> dynamicRoundData;
    }

    getResults(dynamicRoundData: DynamicRoundData) : T[] {
        return [];
    }
}