
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserPlus } from "lucide-react";

interface FlatmateCardProps {
  id: string;
  name: string;
  age: number;
  occupation: string;
  bio: string;
  location: string;
  lookingFor: "flatmate" | "flat" | "both";
  interests: string[];
  image: string;
}

const FlatmateCard = ({
  id,
  name,
  age,
  occupation,
  bio,
  location,
  lookingFor,
  interests,
  image,
}: FlatmateCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={`${name}'s profile`}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h3 className="text-xl font-semibold">{name}, {age}</h3>
          <p className="text-sm opacity-90">{occupation} · {location}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-3 flex flex-wrap gap-1">
          <Badge variant="outline" className="bg-pairup-purple/10 text-pairup-purple border-pairup-purple/30">
            {lookingFor === "flatmate" 
              ? "Looking for flatmate" 
              : lookingFor === "flat" 
                ? "Looking for flat"
                : "Looking for flat/flatmate"}
          </Badge>
          {interests.slice(0, 3).map((interest, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100">
              {interest}
            </Badge>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3">{bio}</p>
      </CardContent>
      
      <CardFooter className="p-4 flex gap-2 border-t bg-gray-50">
        <Button className="flex-1 bg-pairup-purple hover:bg-pairup-purple-dark">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button variant="outline" className="flex-1">
          <UserPlus className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FlatmateCard;
