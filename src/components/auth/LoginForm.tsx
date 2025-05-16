
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      // In a real application, this would authenticate with a backend
      console.log("Login attempt with:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration, we'll just redirect and show success message
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-pairup-purple hover:bg-pairup-purple-dark" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account yet?{" "}
          <Link to="/auth/signup" className="text-pairup-purple hover:underline">
            Sign up
          </Link>
        </p>
        <Link to="/auth/forgot-password" className="text-sm text-pairup-purple hover:underline">
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
