
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import MessageIcon from "@/components/messages/MessageIcon";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-pairup-purple">
                Pair<span className="text-pairup-neutral">Up</span>
              </span>
            </Link>
            {!isMobile && (
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  to="/flatmates"
                  className="text-gray-600 hover:text-pairup-purple px-3 py-2 rounded-md text-sm font-medium"
                >
                  Flatmates
                </Link>
                <Link
                  to="/events"
                  className="text-gray-600 hover:text-pairup-purple px-3 py-2 rounded-md text-sm font-medium"
                >
                  Events
                </Link>
                <Link
                  to="/messages"
                  className="text-gray-600 hover:text-pairup-purple px-3 py-2 rounded-md text-sm font-medium"
                >
                  Messages
                </Link>
              </div>
            )}
          </div>

          {/* Search and nav items */}
          <div className="flex items-center">
            {!isMobile && (
              <div className="relative mr-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-[200px] pl-8 rounded-full bg-gray-100 border-none"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <MessageIcon />
              <NotificationDropdown />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full overflow-hidden"
                  >
                    <Avatar>
                      <AvatarImage src="https://source.unsplash.com/random/200x200/?person" />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings" className="w-full">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/auth/login" className="w-full">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
