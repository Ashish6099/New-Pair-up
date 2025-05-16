
import React from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, Calendar, Users, MessageSquare, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

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

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center bg-pairup-purple"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={handleMarkAllAsRead}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Link
                to={notification.link || "#"}
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <DropdownMenuItem className="p-4 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${!notification.read ? "text-pairup-purple" : ""}`}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {notification.description}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-pairup-purple rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </Link>
            ))
          )}
        </ScrollArea>
        <div className="p-2 text-center border-t">
          <Link to="/notifications" className="text-xs text-pairup-purple font-medium hover:underline">
            View all notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
