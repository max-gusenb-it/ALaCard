import { Player, User } from "../models/interfaces";
import { PlayerState } from "../models/interfaces/logic/room/Player";

export namespace UserUtils {
    export function exportUserToPlayer(user: User, joinOrder: number) : Player {
        return {
            id: user.id!,
            state: PlayerState.active,
            username: user.username,
            profilePicture: user.profilePicture,
            joinOrder: joinOrder
        }
    }
}