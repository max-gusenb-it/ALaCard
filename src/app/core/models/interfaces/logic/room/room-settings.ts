export interface RoomSettings {
    singleDeviceMode: boolean;
    otherAdmin: boolean;
    // ToDo: Fix -> When 4 users and 3 active -> game will continue when 2 active and 1 inactive vote are submittet -> Wait until all active players submitted answer
    autoContinueOnAllVotes: boolean;
}