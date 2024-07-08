import { IPlayer, IUser } from "../models/interfaces";
import { EPlayerState } from "../models/interfaces/logic/room/IPlayer";

export namespace UserUtils {
    export function exportUserToPlayer(user: IUser, joinOrder: number) : IPlayer {
        return {
            id: user.id!,
            state: EPlayerState.active,
            username: user.username,
            profilePicture: user.profilePicture,
            joinOrder: joinOrder
        }
    }
}