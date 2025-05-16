
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image?: string;
  createdAt: Date;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const PostCard = ({
  id,
  author,
  content,
  image,
  createdAt,
  likes,
  comments,
  isLiked = false,
}: PostCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{author.name}</div>
              <div className="text-xs text-gray-500">
                @{author.username} · {formatDistanceToNow(createdAt, { addSuffix: true })}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-3">
          <p className="whitespace-pre-line">{content}</p>
          
          {image && (
            <div className="mt-3">
              <img 
                src={image} 
                alt="Post attachment" 
                className="rounded-md w-full object-cover max-h-96" 
              />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="py-2 px-4 border-t flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1 ${liked ? "text-red-500" : "text-gray-600"}`}
          onClick={handleLike}
        >
          <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
          <span>{likeCount}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-1 text-gray-600">
          <MessageCircle className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
