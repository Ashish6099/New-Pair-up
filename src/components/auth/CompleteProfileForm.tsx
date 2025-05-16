
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const formSchema = z.object({
  profileImage: z.string().optional(),
  age: z.string().refine((val) => !val || (Number(val) >= 18 && Number(val) <= 100), {
    message: "Age must be between 18 and 100",
  }),
  occupation: z.string().min(2, { message: "Occupation is required" }),
  lookingFor: z.string().min(1, { message: "Please select an option" }),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters" }).optional(),
  interests: z.string().max(200, { message: "Interests cannot exceed 200 characters" }).optional(),
});

const CompleteProfileForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: "",
      age: "",
      occupation: "",
      lookingFor: "",
      bio: "",
      interests: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log("Profile completion data:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Profile completed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Profile completion failed:", error);
      toast.error("Failed to complete profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we'd upload this to storage
      // For now, just create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      form.setValue("profileImage", "profile-image-url-placeholder");
    }
  };

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt="Profile preview" />
                  ) : (
                    <AvatarFallback className="text-2xl bg-pairup-purple text-white">
                      {form.watch("profileImage") ? "U" : "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-pairup-purple text-white rounded-full p-1 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" min={18} max={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Student, Professional, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="lookingFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I am looking for</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select what you're looking for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flatmate">A flatmate</SelectItem>
                        <SelectItem value="flat">A flat to move into</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                        <SelectItem value="events">Just events and socializing</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell others about yourself..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-right">
                    {field.value?.length || 0}/500
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Reading, Hiking, Cooking, etc." 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Separate interests with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-pairup-purple hover:bg-pairup-purple-dark"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Complete Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompleteProfileForm;
