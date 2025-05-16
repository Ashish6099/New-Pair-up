
import React, { useEffect, useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { useMessages } from "@/contexts/MessageContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const MessagesPage = () => {
  const {
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    getMessagesForConversation,
    markConversationAsRead,
    totalUnreadMessages,
  } = useMessages();
  
  const { markAsRead } = useNotifications();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (activeConversationId) {
      markConversationAsRead(activeConversationId);
      
      // Mark related notifications as read
      const relatedNotification = conversations
        .find(c => c.id === activeConversationId)?.participantId;
      
      if (relatedNotification) {
        markAsRead(relatedNotification);
      }
    }
  }, [activeConversationId]);
  
  useEffect(() => {
    // Scroll to bottom of messages on conversation change or new message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversationId, messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConversationId || !newMessage.trim()) return;
    
    sendMessage(activeConversationId, newMessage.trim());
    setNewMessage("");
  };
  
  const getActiveConversation = () => {
    if (!activeConversationId) return null;
    return conversations.find(c => c.id === activeConversationId) || null;
  };
  
  const activeConversation = getActiveConversation();
  const conversationMessages = activeConversationId 
    ? getMessagesForConversation(activeConversationId)
    : [];
  
  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations list */}
          <Card className="md:col-span-1 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-semibold">Conversations</h2>
              </div>
              <ScrollArea className="h-[500px]">
                {conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
                    <MessageSquare className="h-10 w-10 mb-2" />
                    <p>No conversations yet</p>
                  </div>
                ) : (
                  conversations.map(conversation => (
                    <div key={conversation.id}>
                      <button
                        className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                          activeConversationId === conversation.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => setActiveConversationId(conversation.id)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                            <AvatarFallback>{conversation.participantName[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-pairup-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">{conversation.participantName}</h3>
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(conversation.lastMessageDate, { addSuffix: true })}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${!conversation.unreadCount ? 'text-gray-500' : 'font-medium'}`}>
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </button>
                      <Separator />
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          
          {/* Message thread */}
          <Card className="md:col-span-2 overflow-hidden">
            <CardContent className="p-0 h-[600px] flex flex-col">
              {!activeConversationId ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-500">
                  <MessageSquare className="h-16 w-16 mb-4" />
                  <h2 className="text-xl font-medium mb-2">Your Messages</h2>
                  <p>Select a conversation to start messaging</p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="p-4 bg-gray-50 border-b flex items-center gap-3">
                    <Avatar>
                      <AvatarImage 
                        src={activeConversation?.participantAvatar} 
                        alt={activeConversation?.participantName} 
                      />
                      <AvatarFallback>
                        {activeConversation?.participantName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{activeConversation?.participantName}</h2>
                    </div>
                  </div>
                  
                  {/* Message area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {conversationMessages.map(message => {
                        const isCurrentUser = message.senderId === "1";
                        return (
                          <div 
                            key={message.id} 
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                                isCurrentUser 
                                  ? 'bg-pairup-purple text-white' 
                                  : 'bg-gray-100'
                              }`}
                            >
                              <p>{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                isCurrentUser ? 'text-purple-200' : 'text-gray-500'
                              }`}>
                                {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Message input */}
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
