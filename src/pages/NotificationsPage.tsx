
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar, MessageSquare, Users, Info } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const { notifications, markAllAsRead, clearNotification } = useNotifications();

  const clearAllNotifications = () => {
    // Clear all notifications by calling clearNotification on each one
    notifications.forEach(notification => clearNotification(notification.id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "flatmate":
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {notifications.length > 0 && (
            <Button variant="outline" onClick={clearAllNotifications}>
              Clear All
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card className="text-center py-12">
            <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">No notifications</h3>
            <p className="text-gray-500">
              You don't have any notifications at the moment
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors ${
                  notification.read ? "bg-white" : "bg-blue-50"
                }`}
                onClick={() => notification.link && window.location.assign(notification.link)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {notification.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 rounded-full p-1 bg-white">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-700">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NotificationsPage;
