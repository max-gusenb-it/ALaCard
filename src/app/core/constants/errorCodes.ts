export namespace RoomSourceServiceErrors {
    export const getRoomNoUser = "room-source-service.get-room.no-user-found";
    export const roomNotFound = "room-source-service.get-room.room-not-found";
}

export namespace RoomStateErrors {
    export const joinRoomNoUser = "room-state.join-room.no-user-found";
    export const joinRoomOffline = "room-state.join-room.cant-join-room-when-offline";
    export const joinRoomInOffline = "room-state.join-room.cant-join-offline-room";
}
