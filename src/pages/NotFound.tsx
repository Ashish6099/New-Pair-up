
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pairup-background">
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold mb-4 text-pairup-purple">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! This page has gone missing</p>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Button className="bg-pairup-purple hover:bg-pairup-purple-dark">
          <Home className="mr-2 h-4 w-4" />
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
