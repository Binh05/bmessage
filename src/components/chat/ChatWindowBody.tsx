import { useAppSelector } from "@/lib/hooks";
import { chatSelector } from "@/lib/selector";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import MessageItem from "./MessageItem";
import { useLayoutEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useChat } from "@/hooks/useChat";

const ChatWindowBody = () => {
  const {
    conversations,
    activeConversationId,
    messages: allMessages,
  } = useAppSelector(chatSelector);
  const scrollPointRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { fetchMessages } = useChat();

  const messages = allMessages[activeConversationId!]?.items ?? [];
  const reverseMessage = [...messages].reverse();
  const selectedConvo = conversations.find(
    (convo) => convo._id === activeConversationId,
  );
  const hasMore = allMessages[activeConversationId!]?.hasMore ?? false;
  const key = `chat-scroll-${activeConversationId}`;

  useLayoutEffect(() => {
    if (!scrollPointRef.current) return;

    scrollPointRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeConversationId]);

  const fetchMoreMessages = async () => {
    if (!activeConversationId) {
      return;
    }

    try {
      await fetchMessages(activeConversationId);
    } catch (error) {
      console.error("Lỗi khi fetch thêm message", error);
    }
  };

  const chatScrollSave = () => {
    const container = containerRef.current;

    if (!container || !activeConversationId) {
      return;
    }

    sessionStorage.setItem(
      key,
      JSON.stringify({
        scrollTop: container.scrollTop,
      }),
    );
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    

    const item = sessionStorage.getItem(key);

    if (item) {
      const { scrollTop } = JSON.parse(item);
      requestAnimationFrame(() => {
        container.scrollTop = scrollTop;
      });
    }
  }, [messages.length]);

  

  if (!selectedConvo) {
    return <ChatWelcomeScreen />;
  }

  if (!messages?.length) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Bạn chưa có tin nhắn nào.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden p-4">
      <div
        id="scrollableDiv"
        ref={containerRef}
        onScroll={chatScrollSave}
        className="beautiful-scrollbar bg-primary-foreground flex flex-col-reverse overflow-x-hidden overflow-y-auto"
      >
        <div ref={scrollPointRef}></div>
        <InfiniteScroll
          dataLength={messages.length}
          hasMore={hasMore}
          next={fetchMoreMessages}
          loader={<p className="text-center">Đang tải...</p>}
          scrollableTarget="scrollableDiv"
          inverse={true}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "visible",
          }}
        >
          {reverseMessage.map((message, i) => (
            <MessageItem
              key={message?._id ?? i}
              message={message}
              index={i}
              messages={reverseMessage}
              selectedConvo={selectedConvo}
              lastMessageStatus="Đã gửi"
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChatWindowBody;
