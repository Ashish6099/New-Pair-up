
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useMessages } from "@/contexts/MessageContext";

const MessageIcon = () => {
  const { totalUnreadMessages } = useMessages();

  return (
    <Link to="/messages">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
      >
        <MessageSquare className="h-5 w-5" />
        {totalUnreadMessages > 0 && (
          <Badge
            className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center bg-pairup-purple"
          >
            {totalUnreadMessages}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default MessageIcon;
