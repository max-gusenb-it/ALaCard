export namespace RoomSourceServiceErrors {
    export const getRoomNoUser = "room-source-service.get-room.no-user-found";
    export const roomNotFound = "room-source-service.get-room.room-not-found";
}

export namespace RoomStateErrors {
    export const joinRoomNoUser = "room-state.join-room.no-user-found";
    export const joinRoomOffline = "room-state.join-room.cant-join-room-when-offline";
    export const joinRoomInOffline = "room-state.join-room.cant-join-offline-room";
    export const startGameReadRoomNotFound = "room-state.start-game.room-not-found";
    export const continueToGameReadGameNotFound = "room-state.continue-to-game.game-not-found";
    export const endGameReadGameNotFound = "room-state.end-game.game-not-found";
}

export namespace SharedErrors {
    export const unknownError = "unknown-error";
}

export namespace InformationStateErrors {
    export const gameRulesReadGINotFound = "information-state.game-rules-read.gi-not-found";
    export const setGameRulesCardIndexGINotFound = "information-state.set-game-rules-card-index.gi-not-found";
    export const setRoundIdGINotFound = "information-state.set-round-id.gi-not-found"
    export const setRoundCardClickedGINotFound = "information-state.set-round-card-clicked.gi-not-found"
    export const roundInfomrationNotFound = "information-state.round-information-not-found";
}
