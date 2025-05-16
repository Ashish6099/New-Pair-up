
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Calendar, User, MessageSquare, Bell } from "lucide-react";
import { useMessages } from "@/contexts/MessageContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { Badge } from "@/components/ui/badge";

const MobileNav = () => {
  const location = useLocation();
  const { totalUnreadMessages } = useMessages();
  const { unreadCount } = useNotifications();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 w-full border-t bg-white border-gray-200 py-2 md:hidden z-40">
      <div className="grid grid-cols-5 gap-1">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 ${
            isActive("/") ? "text-pairup-purple" : "text-gray-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/search"
          className={`flex flex-col items-center justify-center py-1 ${
            isActive("/search") ? "text-pairup-purple" : "text-gray-500"
          }`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link
          to="/messages"
          className={`flex flex-col items-center justify-center py-1 relative ${
            isActive("/messages") ? "text-pairup-purple" : "text-gray-500"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          {totalUnreadMessages > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center bg-pairup-purple">
              {totalUnreadMessages}
            </Badge>
          )}
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link
          to="/notifications"
          className={`flex flex-col items-center justify-center py-1 relative ${
            isActive("/notifications") ? "text-pairup-purple" : "text-gray-500"
          }`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center bg-pairup-purple">
              {unreadCount}
            </Badge>
          )}
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center py-1 ${
            isActive("/profile") ? "text-pairup-purple" : "text-gray-500"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
