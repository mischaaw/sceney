"use client";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import Sell from "./pages/Sell";
import SellSuccess from "./pages/SellSuccess";
import TicketDetails from "./pages/TicketDetails";
import Checkout from "./pages/Checkout";
import Messages from "./pages/Messages";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Verification from "./pages/Verification";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!session ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/ticket/:id" element={<TicketDetails />} />
            <Route path="/checkout/:id" element={session ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="/messages" element={session ? <Messages /> : <Navigate to="/login" />} />
            <Route path="/messages/chat" element={session ? <Chat /> : <Navigate to="/login" />} />
            <Route path="/admin" element={session ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/sell" element={session ? <Sell /> : <Navigate to="/login" />} />
            <Route path="/sell/success" element={session ? <SellSuccess /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/profile" element={session ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/verification" element={session ? <Verification /> : <Navigate to="/login" />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;