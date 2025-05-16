
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, Grid3X3, List, MapPin, PlusCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EventCard from "@/components/events/EventCard";
import { useIsMobile } from "@/hooks/use-mobile";

const EventsPage = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock categories
  const categories = ["All", "Social", "Education", "Sports", "Arts", "Food & Drink", "Networking"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock events data
  const events = [
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
    },
    {
      id: "4",
      title: "Budget-Friendly Cooking Workshop",
      description: "Learn how to cook delicious meals on a budget - perfect for students and young professionals sharing flats!",
      date: "Jul 5, 2025",
      time: "2:00 PM",
      location: "Community Kitchen, Brixton",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      organizer: {
        name: "Budget Foodies",
        avatar: "https://source.unsplash.com/random/200x200/?cooking",
      },
      attendees: 18,
      category: "Food & Drink",
    },
    {
      id: "5",
      title: "Flatmate Fitness: Group Workout",
      description: "Join other flatmate-seekers for a group workout session followed by smoothies and socializing. A healthy way to make connections!",
      date: "Jul 12, 2025",
      time: "10:00 AM",
      location: "Fitness Park, Hampstead Heath",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
      organizer: {
        name: "Active London",
        avatar: "https://source.unsplash.com/random/200x200/?fitness",
      },
      attendees: 15,
      category: "Sports",
    },
    {
      id: "6",
      title: "DIY Home Decor Workshop",
      description: "Learn how to spruce up your flat with budget-friendly DIY decor projects. Take home your creations!",
      date: "Jul 19, 2025",
      time: "3:30 PM",
      location: "Craft Studio, Islington",
      imageUrl: "https://images.unsplash.com/photo-1558442086-8ea5d458f5dd?q=80&w=800&auto=format&fit=crop",
      organizer: {
        name: "Creative Spaces",
        avatar: "https://source.unsplash.com/random/200x200/?craft",
      },
      attendees: 22,
      category: "Arts",
    },
  ];
  
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = 
      searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Events</h1>
          <Button className="bg-pairup-purple hover:bg-pairup-purple-dark">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search events..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {!isMobile && (
                <div className="flex border rounded-md overflow-hidden">
                  <Button 
                    variant={view === "grid" ? "default" : "ghost"} 
                    size="icon" 
                    onClick={() => setView("grid")}
                    className={view === "grid" ? "bg-pairup-purple hover:bg-pairup-purple-dark" : ""}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={view === "list" ? "default" : "ghost"} 
                    size="icon" 
                    onClick={() => setView("list")}
                    className={view === "list" ? "bg-pairup-purple hover:bg-pairup-purple-dark" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedCategory === category 
                    ? "bg-pairup-purple hover:bg-pairup-purple-dark" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Events grid or list */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : view === "grid" || isMobile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="flex gap-4 border rounded-lg overflow-hidden">
                <div className="w-40 h-40 bg-gray-100 flex-shrink-0">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col p-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <Badge>{event.category}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 flex-1">{event.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="outline">{event.attendees} attending</Badge>
                    </div>
                    <Button className="bg-pairup-purple hover:bg-pairup-purple-dark">
                      I'm interested
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventsPage;
