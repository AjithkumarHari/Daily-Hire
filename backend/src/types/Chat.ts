export interface Chat{
    _id?: string,
    content: string,
    date: Date,
    chatRoomId: any,
    senderId: any,
    receiverId: any,
    isRead?: Boolean,
}