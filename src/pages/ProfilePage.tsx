
import React from "react";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail, Calendar, Edit, MessageSquare } from "lucide-react";
import PostCard from "@/components/social/PostCard";
import EventCard from "@/components/events/EventCard";

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexj",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    bio: "Software developer by day, musician by night. Looking for a flat or flatmate in East London. Clean, respectful, and sociable but also value personal space.",
    location: "East London",
    email: "alex@example.com",
    joinedDate: "May 2022",
    lookingFor: "flatmate" as const,
    interests: ["Music", "Cooking", "Hiking", "Technology", "Photography"],
  };

  // Mock posts data
  const userPosts = [
    {
      id: "1",
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
      content: "Just viewed a great flat in Hackney today! Spacious living room and close to the tube. Still looking for a flatmate to share it with. DM me if interested! #FlatHunting #EastLondon",
      createdAt: new Date(2025, 4, 2), // May 2, 2025
      likes: 8,
      comments: 3,
      isLiked: false,
    },
    {
      id: "2",
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
      content: "Had an amazing time at the PairUp meetup yesterday! Met so many potential flatmates and made some new friends. Thanks to everyone who organized it!",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      createdAt: new Date(2025, 3, 28), // April 28, 2025
      likes: 15,
      comments: 5,
      isLiked: true,
    },
  ];

  // Mock events the user is attending
  const attendingEvents = [
    {
      id: "1",
      title: "Flatmate Mixer & Games Night",
      description: "Meet potential flatmates while enjoying board games and drinks! Perfect for finding your next housing match.",
      date: "Jun 15, 2025",
      time: "7:00 PM",
      location: "The Friendly Cafe, Soho",
      imageUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=800&auto=format&fit=crop",
      organizer: {
        name: "London Flatmates Group",
        avatar: "https://source.unsplash.com/random/200x200/?group",
      },
      attendees: 24,
      category: "Social",
      isAttending: true,
    },
    {
      id: "3",
      title: "Flatmate Speed Dating",
      description: "Quick 5-minute chats with potential flatmates to see if you're compatible! A fun way to meet multiple people in one evening.",
      date: "Jun 28, 2025",
      time: "6:00 PM",
      location: "The Social Hub, Shoreditch",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      organizer: {
        name: "PairUp Events Team",
        avatar: "https://source.unsplash.com/random/200x200/?people",
      },
      attendees: 42,
      category: "Social",
      isAttending: true,
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        <Card className="mb-6 overflow-hidden">
          {/* Cover photo */}
          <div className="h-48 bg-gradient-to-r from-pairup-purple to-pairup-purple-dark" />
          
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row md:items-end -mt-12 md:-mt-16 mb-4 md:mb-6 relative">
              {/* Profile photo */}
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              
              {/* Profile actions */}
              <div className="mt-4 md:mt-0 md:ml-auto flex flex-wrap gap-2">
                <Button className="bg-pairup-purple hover:bg-pairup-purple-dark">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            {/* Profile info */}
            <div>
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-sm text-gray-500 mb-3">@{user.username}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1 text-pairup-purple" />
                  {user.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-1 text-pairup-purple" />
                  {user.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1 text-pairup-purple" />
                  Joined {user.joinedDate}
                </div>
              </div>
              
              <Badge className="mb-4 bg-pairup-purple">
                {user.lookingFor === 'flatmate' ? 'Looking for flatmate' : 'Looking for flat'}
              </Badge>
              
              <p className="mb-4 text-gray-700">{user.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <Badge key={index} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="posts">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          {/* Posts tab */}
          <TabsContent value="posts">
            <div className="space-y-4">
              {userPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </TabsContent>
          
          {/* Events tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attendingEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfilePage;
