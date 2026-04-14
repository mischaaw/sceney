import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import Sell from "./pages/Sell";
import TicketDetails from "./pages/TicketDetails";
import Checkout from "./pages/Checkout";
import Messages from "./pages/Messages";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/chat" element={<Chat />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verification" element={<Verification />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;