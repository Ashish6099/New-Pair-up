
import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadCount: number;
}

interface MessageContextType {
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, content: string) => void;
  getMessagesForConversation: (conversationId: string) => Message[];
  markConversationAsRead: (conversationId: string) => void;
  totalUnreadMessages: number;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);

  // Load mock data on first render
  useEffect(() => {
    // Mock conversations
    const mockConversations: Conversation[] = [
      {
        id: "1",
        participantId: "2",
        participantName: "Emma Wilson",
        participantAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        lastMessage: "Hey, I'm interested in the flat you posted about. Is it still available?",
        lastMessageDate: new Date(2025, 4, 15, 14, 30),
        unreadCount: 2,
      },
      {
        id: "2",
        participantId: "3",
        participantName: "Michael Chen",
        participantAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        lastMessage: "Thanks for RSVP'ing to my event! Looking forward to seeing you there.",
        lastMessageDate: new Date(2025, 4, 14, 9, 15),
        unreadCount: 0,
      },
      {
        id: "3",
        participantId: "4",
        participantName: "Sarah Johnson",
        participantAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
        lastMessage: "I think we'd be great flatmates! When can we meet to discuss?",
        lastMessageDate: new Date(2025, 4, 13, 18, 45),
        unreadCount: 3,
      },
    ];

    // Mock messages for the first conversation
    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: "2", // Emma
        receiverId: "1", // Current user
        content: "Hi there! I saw your profile and I think we might be compatible as flatmates.",
        createdAt: new Date(2025, 4, 15, 14, 20),
        read: true,
      },
      {
        id: "2",
        senderId: "1", // Current user
        receiverId: "2", // Emma
        content: "Hello Emma! Thanks for reaching out. I'm definitely looking for a flatmate. What area are you interested in?",
        createdAt: new Date(2025, 4, 15, 14, 25),
        read: true,
      },
      {
        id: "3",
        senderId: "2", // Emma
        receiverId: "1", // Current user
        content: "I'm looking in East London, preferably near the tube. What's your budget range?",
        createdAt: new Date(2025, 4, 15, 14, 28),
        read: false,
      },
      {
        id: "4",
        senderId: "2", // Emma
        receiverId: "1", // Current user
        content: "Hey, I'm interested in the flat you posted about. Is it still available?",
        createdAt: new Date(2025, 4, 15, 14, 30),
        read: false,
      },
      // Messages for other conversations...
      {
        id: "5",
        senderId: "3", // Michael
        receiverId: "1", // Current user
        content: "Hi! I'm hosting a flatmate mixer event next week. Would you like to come?",
        createdAt: new Date(2025, 4, 14, 9, 10),
        read: true,
      },
      {
        id: "6",
        senderId: "1", // Current user
        receiverId: "3", // Michael
        content: "That sounds great! I'd love to attend.",
        createdAt: new Date(2025, 4, 14, 9, 12),
        read: true,
      },
      {
        id: "7",
        senderId: "3", // Michael
        receiverId: "1", // Current user
        content: "Thanks for RSVP'ing to my event! Looking forward to seeing you there.",
        createdAt: new Date(2025, 4, 14, 9, 15),
        read: true,
      },
      // Third conversation
      {
        id: "8",
        senderId: "4", // Sarah
        receiverId: "1", // Current user
        content: "Hello! I noticed we have a lot of similar interests. Are you still looking for a flatmate?",
        createdAt: new Date(2025, 4, 13, 18, 30),
        read: true,
      },
      {
        id: "9",
        senderId: "1", // Current user
        receiverId: "4", // Sarah
        content: "Hi Sarah! Yes, I am. I like your profile too. What area are you looking in?",
        createdAt: new Date(2025, 4, 13, 18, 35),
        read: true,
      },
      {
        id: "10",
        senderId: "4", // Sarah
        receiverId: "1", // Current user
        content: "I'm flexible, but ideally somewhere in North London. I work remotely so good internet is a must!",
        createdAt: new Date(2025, 4, 13, 18, 40),
        read: false,
      },
      {
        id: "11",
        senderId: "4", // Sarah
        receiverId: "1", // Current user
        content: "I have a few places in mind we could look at.",
        createdAt: new Date(2025, 4, 13, 18, 42),
        read: false,
      },
      {
        id: "12",
        senderId: "4", // Sarah
        receiverId: "1", // Current user
        content: "I think we'd be great flatmates! When can we meet to discuss?",
        createdAt: new Date(2025, 4, 13, 18, 45),
        read: false,
      },
    ];

    setConversations(mockConversations);
    setMessages(mockMessages);
    
    // Calculate total unread messages
    const totalUnread = mockConversations.reduce((sum, conversation) => sum + conversation.unreadCount, 0);
    setTotalUnreadMessages(totalUnread);
  }, []);

  const getMessagesForConversation = (conversationId: string): Message[] => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return [];
    
    return messages.filter(
      m => (m.senderId === conversation.participantId && m.receiverId === "1") || 
           (m.senderId === "1" && m.receiverId === conversation.participantId)
    ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  };

  const markConversationAsRead = (conversationId: string) => {
    // Mark all messages in the conversation as read
    const updatedMessages = messages.map(message => {
      const conversation = conversations.find(c => c.id === conversationId);
      if (!conversation) return message;
      
      if (message.senderId === conversation.participantId && message.receiverId === "1" && !message.read) {
        return { ...message, read: true };
      }
      return message;
    });
    
    // Update the unread count for the conversation
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return { ...conversation, unreadCount: 0 };
      }
      return conversation;
    });
    
    setMessages(updatedMessages);
    setConversations(updatedConversations);
    
    // Recalculate total unread messages
    const newTotalUnread = updatedConversations.reduce((sum, conversation) => sum + conversation.unreadCount, 0);
    setTotalUnreadMessages(newTotalUnread);
  };

  const sendMessage = (conversationId: string, content: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    // Create a new message
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: "1", // Current user
      receiverId: conversation.participantId,
      content,
      createdAt: new Date(),
      read: false,
    };
    
    // Update messages
    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation with last message
    const updatedConversations = conversations.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: content,
          lastMessageDate: new Date(),
        };
      }
      return c;
    });
    
    setConversations(updatedConversations);
  };

  return (
    <MessageContext.Provider
      value={{
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        getMessagesForConversation,
        markConversationAsRead,
        totalUnreadMessages
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
