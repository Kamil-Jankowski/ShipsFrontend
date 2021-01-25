/**
 * Represents the response of addPlayer operation to RoomService.
 */
export interface StatusWithToken {
    roomId: string;
    token: string;
}