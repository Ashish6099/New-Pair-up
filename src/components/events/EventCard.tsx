
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: number;
  category: string;
  isAttending?: boolean;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  location,
  imageUrl,
  organizer,
  attendees,
  category,
  isAttending = false,
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-2 bg-pairup-purple">{category}</Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <div className="flex items-center mr-4">
            <Calendar className="h-3.5 w-3.5 mr-1 text-pairup-purple" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 text-pairup-purple" />
            <span>{time}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0 text-pairup-purple" />
          <span className="truncate">{location}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={organizer.avatar} />
              <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">by {organizer.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Users className="h-3.5 w-3.5 mr-1 text-pairup-purple" />
            <span>{attendees} attending</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-gray-50">
        <Button
          className={`w-full ${
            isAttending
              ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
              : "bg-pairup-purple hover:bg-pairup-purple-dark"
          }`}
        >
          {isAttending ? "Going" : "I'm interested"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
