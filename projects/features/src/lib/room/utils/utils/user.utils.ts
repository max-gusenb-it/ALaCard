import { Player } from "../../models";
import { PlayerState, User } from "@shared";

// ToDo: rename to player
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