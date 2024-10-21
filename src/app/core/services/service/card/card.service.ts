import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { playerNameWhitecard, specificPlayerNameWhitecard } from "src/app/core/constants/card";
import { PlayerState } from "src/app/core/models/enums";
import { Card, DynamicRoundData, GameSettings, Player, Response, Result, Round, SipResult } from "src/app/core/models/interfaces";
import { Utils } from "src/app/core/utils/utils";

@Injectable({
    providedIn: 'root'
})
export class CardService<C extends Card, R extends Response, D extends DynamicRoundData, T extends Result> {
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

    castCard(card: Card) : C {
        return <C> card;
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

    castResult(result: Result) : T {
        return <T> result;
    }

    getResults(dynamicRoundData: DynamicRoundData) : T[] {
        return [];
    }

    getResultText(result: Result, translateService: TranslateService) {
        return "";
    }

    cardHasResultSubText(card: Card): boolean {
        return false;
    }

    getResultSubText(result: Result, players: Player[]) {
        return "";
    }

    getSipResults(dynamicRoundData: DynamicRoundData) : SipResult[] {
        return [];
    }

    getPlayerForSipResult(players: Player[], result: SipResult) {
        return players.find(p => p.id === result.playerId);
    }
}