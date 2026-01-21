import { ConversationResponse } from "@/types/chat";
import DirectMessageCard from "./DirectMessageCard";

export const conversationResponse: ConversationResponse = {
    conversations: [
        {
            _id: "convo_1",
            type: "direct",
            group: {
                name: "",
                createdBy: "user_1",
            },
            participants: [
                {
                    _id: "user_1",
                    displayName: "Nguyễn Văn A",
                    avatarUrl: "/avatars/a.png",
                    joinedAt: new Date(
                        Date.now() - 5 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                },
                {
                    _id: "user_2",
                    displayName: "Trần Thị B",
                    avatarUrl: "/avatars/b.png",
                    joinedAt: new Date(
                        Date.now() - 5 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                },
            ],
            lastMessageAt: new Date().toISOString(),
            seenBy: [
                {
                    _id: "user_1",
                    displayName: "Nguyễn Văn A",
                    avatarUrl: "/avatars/a.png",
                },
            ],
            lastMessage: {
                _id: "msg_1",
                content: "Hello, bạn đang rảnh không?",
                createdAt: new Date().toISOString(),
                sender: {
                    _id: "user_2",
                    displayName: "Trần Thị B",
                    avatarUrl: "/avatars/b.png",
                },
            },
            unreadCounts: {
                user_1: 1,
                user_2: 0,
            },
            createdAt: new Date(
                Date.now() - 7 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            updatedAt: new Date().toISOString(),
        },

        {
            _id: "convo_2",
            type: "group",
            group: {
                name: "Frontend Team",
                createdBy: "user_1",
            },
            participants: [
                {
                    _id: "user_1",
                    displayName: "Nguyễn Văn A",
                    avatarUrl: "/avatars/a.png",
                    joinedAt: new Date(
                        Date.now() - 10 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                },
                {
                    _id: "user_3",
                    displayName: "Lê Văn C",
                    avatarUrl: "/avatars/c.png",
                    joinedAt: new Date(
                        Date.now() - 9 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                },
                {
                    _id: "user_4",
                    displayName: "Phạm Thị D",
                    avatarUrl: null,
                    joinedAt: new Date(
                        Date.now() - 8 * 24 * 60 * 60 * 1000,
                    ).toISOString(),
                },
            ],
            lastMessageAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            seenBy: [
                {
                    _id: "user_3",
                    displayName: "Lê Văn C",
                },
            ],
            lastMessage: {
                _id: "msg_2",
                content: "Mọi người nhớ review PR trước 5h nhé",
                createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
                sender: {
                    _id: "user_1",
                    displayName: "Nguyễn Văn A",
                    avatarUrl: "/avatars/a.png",
                },
            },
            unreadCounts: {
                user_1: 0,
                user_3: 0,
                user_4: 2,
            },
            createdAt: new Date(
                Date.now() - 12 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ],
};

function DirectMessageList() {
    return (
        <div className="flex flex-col gap-2">
            DirectMessageList
            {conversationResponse.conversations.map((convo) => (
                <DirectMessageCard convo={convo} key={convo._id} />
            ))}
        </div>
    );
}

export default DirectMessageList;
