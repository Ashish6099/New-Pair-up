
import React from "react";
import CompleteProfileForm from "@/components/auth/CompleteProfileForm";
import { Link } from "react-router-dom";

const CompleteProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pairup-background">
      <div className="py-4 px-6 border-b">
        <div className="flex items-center max-w-6xl mx-auto">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-pairup-purple">
              Pair<span className="text-pairup-neutral">Up</span>
            </span>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <CompleteProfileForm />
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
