
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MessageProvider } from "@/contexts/MessageContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Index from "./pages/Index";
import FlatmatesPage from "./pages/FlatmatesPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MessageProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/flatmates" element={<FlatmatesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/auth/:action" element={<AuthPage />} />
              <Route path="/complete-profile" element={<CompleteProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </MessageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
