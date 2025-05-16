
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import FlatmateCard from "@/components/flatmates/FlatmateCard";
import FlatmateFilter from "@/components/flatmates/FlatmateFilter";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const FlatmatesPage = () => {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState({
    ageRange: [18, 45],
    lookingFor: "all",
    location: "",
    priceRange: [0, 2000],
    interests: "",
  });
  
  // Mock flatmates data
  const flatmates = [
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
    {
      id: "3",
      name: "David Wilson",
      age: 28,
      occupation: "Doctor",
      bio: "Medical professional looking for a quiet and clean living space. I work varying shifts at the hospital, so I appreciate respectful flatmates. I enjoy reading and running in my free time.",
      location: "West London",
      lookingFor: "flat" as const,
      interests: ["Running", "Reading", "Cooking"],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "4",
      name: "Emma Roberts",
      age: 26,
      occupation: "Marketing Manager",
      bio: "Looking for a sociable flatmate to share my 2-bed flat in South London. The flat has a nice living room, fully equipped kitchen, and a balcony. I'm friendly, enjoy cooking, and occasionally host small gatherings.",
      location: "South London",
      lookingFor: "flatmate" as const,
      interests: ["Yoga", "Wine tasting", "Hiking"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "5",
      name: "Michael Chen",
      age: 27,
      occupation: "Financial Analyst",
      bio: "Looking for a room in Central London, ideally close to tube stations. I'm tidy, respectful of privacy, and work regular hours. I like to keep fit and enjoy exploring new restaurants on weekends.",
      location: "Central London",
      lookingFor: "flat" as const,
      interests: ["Fitness", "Food", "Football"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "6",
      name: "Olivia Taylor",
      age: 23,
      occupation: "Student",
      bio: "Master's student looking for a flat share with other students or young professionals. I'm friendly, clean, and quiet when studying. Looking for something affordable near university.",
      location: "North London",
      lookingFor: "flat" as const,
      interests: ["Music", "Books", "Movies"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    },
  ];
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log("Applied filters:", newFilters);
    // In a real app, we'd filter the results here
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Flats & Flatmates</h1>
          <Button className="bg-pairup-purple hover:bg-pairup-purple-dark">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Listing
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <FlatmateFilter 
                onFilterChange={handleFilterChange} 
                filters={filters}
                isMobile={isMobile}
              />
            </div>
          )}
          
          {/* Mobile filters */}
          {isMobile && (
            <div className="col-span-full">
              <FlatmateFilter 
                onFilterChange={handleFilterChange} 
                filters={filters}
                isMobile={isMobile}
              />
            </div>
          )}
          
          {/* Results grid */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flatmates.map((flatmate) => (
                <FlatmateCard key={flatmate.id} {...flatmate} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FlatmatesPage;
