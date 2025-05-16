
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const AuthPage = () => {
  const { action } = useParams<{ action: string }>();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pairup-purple to-pairup-purple-dark">
      <div className="py-4 px-6">
        <div className="flex items-center">
          <a href="/" className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-white">
              Pair<span className="text-white/80">Up</span>
            </span>
          </a>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {action === "login" ? <LoginForm /> : <SignupForm />}
          
          <div className="mt-6 text-center text-sm text-white/80">
            <p>By continuing, you agree to our</p>
            <div className="mt-1">
              <a href="#" className="text-white hover:underline">Terms of Service</a>
              {" "}&{" "}
              <a href="#" className="text-white hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
