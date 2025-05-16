
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type: 'message' | 'event' | 'flatmate' | 'system';
  title: string;
  description: string;
  createdAt: Date;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  // Load mock notifications on first render
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "message",
        title: "New message from Emma Wilson",
        description: "Hey, I'm interested in the flat you posted about...",
        createdAt: new Date(2025, 4, 15, 14, 30),
        read: false,
        link: "/messages/1",
      },
      {
        id: "2",
        type: "event",
        title: "Upcoming event: Flatmate Mixer & Games Night",
        description: "Reminder: This event is happening tomorrow at 7:00 PM.",
        createdAt: new Date(2025, 4, 14, 10, 0),
        read: false,
        link: "/events",
      },
      {
        id: "3",
        type: "flatmate",
        title: "New flatmate match!",
        description: "Sarah Johnson might be a good match for you based on your preferences.",
        createdAt: new Date(2025, 4, 13, 15, 45),
        read: true,
        link: "/flatmates",
      },
      {
        id: "4",
        type: "system",
        title: "Profile incomplete",
        description: "Complete your profile to get better flatmate matches.",
        createdAt: new Date(2025, 4, 12, 9, 30),
        read: true,
        link: "/profile",
      },
    ];

    setNotifications(mockNotifications);
    updateUnreadCount(mockNotifications);
  }, []);

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter(n => !n.read).length;
    setUnreadCount(count);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}`,
      createdAt: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    updateUnreadCount([...notifications, newNotification]);
    
    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.description,
    });
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const clearNotification = (id: string) => {
    const filteredNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(filteredNotifications);
    updateUnreadCount(filteredNotifications);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
