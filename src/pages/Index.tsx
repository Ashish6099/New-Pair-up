import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, UserPlus, Calendar, Search } from "lucide-react";
import FlatmateCard from "@/components/flatmates/FlatmateCard";
import EventCard from "@/components/events/EventCard";
import CreatePost from "@/components/social/CreatePost";
import PostCard from "@/components/social/PostCard";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Mock data for featured flatmates
  const featuredFlatmates = [
    {
      id: "1",
      name: "Alex Johnson",
      age: 25,
      occupation: "Software Developer",
      bio: "Hi there! I'm a software developer looking for a chill flatmate. I'm clean, respectful, and love to cook. I work remotely most days but also go to the office twice a week.",
      location: "East London",
      lookingFor: "flatmate" as const,
      interests: ["Music", "Cooking", "Hiking"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Sophia Martinez",
      age: 24,
      occupation: "Graphic Designer",
      bio: "Creative graphic designer seeking a room in North London. I'm friendly, tidy and love art and design. Looking to move in the next two months.",
      location: "North London",
      lookingFor: "flat" as const,
      interests: ["Art", "Photography", "Travel"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    },
  ];

  // Mock data for featured events
  const featuredEvents = [
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
    },
    {
      id: "2",
      title: "Housing Workshop: Rights & Tips",
      description: "Learn all about tenant rights, lease negotiations and tips for finding the perfect flat in London's competitive market.",
      date: "Jun 22, 2025",
      time: "6:30 PM",
      location: "Community Center, Camden",
      imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop",
      organizer: {
        name: "Housing Support Network",
        avatar: "https://source.unsplash.com/random/200x200/?house",
      },
      attendees: 37,
      category: "Education",
    },
  ];

  // Mock data for recent posts
  const recentPosts = [
    {
      id: "1",
      author: {
        name: "James Wilson",
        username: "jwilson",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop",
      },
      content: "Just moved to a new flat in Shoreditch and I'm looking for recommendations for the best coffee shops in the area! Any suggestions? #NewHome #LondonLife",
      createdAt: new Date(2025, 4, 5), // May 5, 2025
      likes: 14,
      comments: 6,
      isLiked: false,
    },
    {
      id: "2",
      author: {
        name: "Emma Clarke",
        username: "emmac",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=200&auto=format&fit=crop",
      },
      content: "Had an amazing time at the Flatmate Mixer event yesterday! Met so many cool people and might have found my new roommate! Thanks @PairUp for organizing! 🎉",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      createdAt: new Date(2025, 4, 4), // May 4, 2025
      likes: 32,
      comments: 11,
      isLiked: true,
    },
  ];

  return (
    <Layout>
      <div className="py-6">
        {/* Hero banner */}
        <Card className="mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pairup-purple to-pairup-purple-dark text-white p-6 md:p-8 relative"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=1920&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Find Your Perfect Flatmate Match
              </h1>
              <p className="text-sm md:text-base max-w-2xl mb-4 text-white/90">
                Connect with like-minded people looking for flats, find the ideal roommate,
                or discover local events to expand your social circle.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-white text-pairup-purple hover:bg-white/90"
                  onClick={() => navigate("/flatmates")}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Find Flatmates
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20"
                  onClick={() => navigate("/events")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Browse Events
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content & feed column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create post component */}
            <CreatePost />
            
            {/* Social feed - recent posts */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {recentPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
              <div className="text-center mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/feed")}
                >
                  View More
                </Button>
              </div>
            </div>
          </div>

          {/* Side column - featured flatmates, events, etc. */}
          <div className="space-y-6">
            {/* Featured flatmates section */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Featured Flatmates</h2>
                  <Button 
                    variant="link" 
                    className="text-pairup-purple p-0" 
                    onClick={() => navigate("/flatmates")}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {featuredFlatmates.map((flatmate, index) => (
                    <div key={flatmate.id} className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden">
                        <img 
                          src={flatmate.image} 
                          alt={flatmate.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{flatmate.name}, {flatmate.age}</h3>
                        <div className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {flatmate.location}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-pairup-purple hover:bg-pairup-purple-dark"
                        onClick={() => navigate(`/flatmates/${flatmate.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate("/flatmates")}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Find More Flatmates
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming events section */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Upcoming Events</h2>
                  <Button 
                    variant="link" 
                    className="text-pairup-purple p-0" 
                    onClick={() => navigate("/events")}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {featuredEvents.map((event) => (
                    <div key={event.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{event.title}</h3>
                        <div className="text-xs text-gray-600 mt-1">
                          {event.date} • {event.time}
                        </div>
                        <div className="text-xs text-gray-600 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" /> {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="purple" 
                    className="w-full" 
                    onClick={() => navigate("/events")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Browse All Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
