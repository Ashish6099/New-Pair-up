
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Image, MapPin, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }
    
    setIsPosting(true);
    
    try {
      // In a real app, send the post to the API
      console.log("Creating new post:", content);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Post created successfully!");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-4">
          <div className="flex gap-3 mb-3">
            <Avatar>
              <AvatarImage src="https://source.unsplash.com/random/200x200/?person" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Share what's on your mind..."
              className="flex-1 resize-none bg-gray-100 focus-visible:ring-pairup-purple"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t p-3 flex items-center justify-between">
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm" className="text-gray-600">
              <Image className="h-4 w-4 mr-1" />
              Photo
            </Button>
            <Button type="button" variant="ghost" size="sm" className="text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              Location
            </Button>
            <Button type="button" variant="ghost" size="sm" className="text-gray-600 hidden sm:flex">
              <Users className="h-4 w-4 mr-1" />
              Tag
            </Button>
            <Button type="button" variant="ghost" size="sm" className="text-gray-600 hidden sm:flex">
              <Calendar className="h-4 w-4 mr-1" />
              Event
            </Button>
          </div>
          <Button 
            type="submit" 
            size="sm"
            className="bg-pairup-purple hover:bg-pairup-purple-dark"
            disabled={isPosting || !content.trim()}
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePost;
