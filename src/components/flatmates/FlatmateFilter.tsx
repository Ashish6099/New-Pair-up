
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterProps {
  onFilterChange: (filters: any) => void;
  filters: any;
  isMobile: boolean;
}

const FlatmateFilter: React.FC<FilterProps> = ({ onFilterChange, filters, isMobile }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [tempFilters, setTempFilters] = React.useState({
    ageRange: [18, 45],
    lookingFor: "all",
    location: "",
    priceRange: [0, 2000],
    interests: "",
  });

  const applyFilters = () => {
    onFilterChange(tempFilters);
    const newActiveFilters = [];
    if (tempFilters.location) newActiveFilters.push("Location");
    if (tempFilters.lookingFor !== "all") newActiveFilters.push("Looking For");
    if (tempFilters.interests) newActiveFilters.push("Interests");
    if (tempFilters.ageRange[0] > 18 || tempFilters.ageRange[1] < 45) newActiveFilters.push("Age");
    if (tempFilters.priceRange[0] > 0 || tempFilters.priceRange[1] < 2000) newActiveFilters.push("Budget");
    
    setActiveFilters(newActiveFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setTempFilters({
      ageRange: [18, 45],
      lookingFor: "all",
      location: "",
      priceRange: [0, 2000],
      interests: "",
    });
    onFilterChange({
      ageRange: [18, 45],
      lookingFor: "all",
      location: "",
      priceRange: [0, 2000],
      interests: "",
    });
    setActiveFilters([]);
  };

  if (isMobile) {
    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={() => setIsOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
          
          <div className="flex gap-2 overflow-x-auto pb-1 flex-grow ml-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="outline">
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <div>
                    <Label>Location</Label>
                    <Input 
                      placeholder="Enter city or area" 
                      value={tempFilters.location} 
                      onChange={(e) => setTempFilters({...tempFilters, location: e.target.value})} 
                    />
                  </div>
                  
                  <div>
                    <Label>Looking For</Label>
                    <Select 
                      value={tempFilters.lookingFor}
                      onValueChange={(value) => setTempFilters({...tempFilters, lookingFor: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="flatmate">Flatmate</SelectItem>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-1 block">Age Range: {tempFilters.ageRange[0]} - {tempFilters.ageRange[1]}</Label>
                    <Slider
                      min={18}
                      max={60}
                      step={1}
                      value={tempFilters.ageRange}
                      onValueChange={(value) => setTempFilters({...tempFilters, ageRange: value})}
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-1 block">Budget Range: £{tempFilters.priceRange[0]} - £{tempFilters.priceRange[1]}</Label>
                    <Slider
                      min={0}
                      max={3000}
                      step={50}
                      value={tempFilters.priceRange}
                      onValueChange={(value) => setTempFilters({...tempFilters, priceRange: value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Interests</Label>
                    <Input 
                      placeholder="e.g. music, cooking, sports" 
                      value={tempFilters.interests} 
                      onChange={(e) => setTempFilters({...tempFilters, interests: e.target.value})} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t flex gap-2">
                <Button variant="outline" className="flex-1" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button className="flex-1 bg-pairup-purple hover:bg-pairup-purple-dark" onClick={applyFilters}>
                  <Check className="h-4 w-4 mr-2" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="rounded-lg border bg-card mb-6">
      <div className="p-4">
        <h3 className="font-medium mb-3">Filters</h3>
        <div className="space-y-4">
          <div>
            <Label>Location</Label>
            <Input 
              placeholder="Enter city or area" 
              value={tempFilters.location} 
              onChange={(e) => setTempFilters({...tempFilters, location: e.target.value})} 
            />
          </div>
          
          <div>
            <Label>Looking For</Label>
            <Select 
              value={tempFilters.lookingFor}
              onValueChange={(value) => setTempFilters({...tempFilters, lookingFor: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="flatmate">Flatmate</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="mb-1 block">Age Range: {tempFilters.ageRange[0]} - {tempFilters.ageRange[1]}</Label>
            <Slider
              min={18}
              max={60}
              step={1}
              value={tempFilters.ageRange}
              onValueChange={(value) => setTempFilters({...tempFilters, ageRange: value})}
            />
          </div>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="additional">
              <AccordionTrigger className="py-2">Additional Filters</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <Label className="mb-1 block">Budget Range: £{tempFilters.priceRange[0]} - £{tempFilters.priceRange[1]}</Label>
                    <Slider
                      min={0}
                      max={3000}
                      step={50}
                      value={tempFilters.priceRange}
                      onValueChange={(value) => setTempFilters({...tempFilters, priceRange: value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Interests</Label>
                    <Input 
                      placeholder="e.g. music, cooking, sports" 
                      value={tempFilters.interests} 
                      onChange={(e) => setTempFilters({...tempFilters, interests: e.target.value})} 
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={clearFilters}>
              Clear All
            </Button>
            <Button className="flex-1 bg-pairup-purple hover:bg-pairup-purple-dark" onClick={applyFilters}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatmateFilter;
