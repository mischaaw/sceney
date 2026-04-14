"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import TicketCard from "@/components/TicketCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PriceTrendChart from "@/components/PriceTrendChart";
import { cn } from "@/lib/utils";

const MOCK_TICKETS = [
  {
    id: "1",
    title: "Old City Beer Garden",
    date: "Apr 25, 2026 • 12:00 PM",
    location: "Old City Beer Garden",
    price: 45,
    image: "dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png",
    category: "Social",
    likes: 42,
    priceHistory: [
      { date: "Jan", low: 40, high: 65 },
      { date: "Feb", low: 42, high: 70 },
      { date: "Mar", low: 38, high: 68 },
      { date: "Apr", low: 45, high: 75 },
      { date: "May", low: 48, high: 80 },
      { date: "Jun", low: 52, high: 85 },
    ],
  },
  {
    id: "tropics",
    title: "Tropics",
    date: "May 08, 2026 • 2:30 PM",
    location: "Funtown Beach",
    price: 80,
    image: "dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png",
    category: "Social",
    likes: 128,
    priceHistory: [
      { date: "Jan", low: 60, high: 80 },
      { date: "Feb", low: 62, high: 85 },
      { date: "Mar", low: 65, high: 90 },
      { date: "Apr", low: 70, high: 100 },
      { date: "May", low: 75, high: 110 },
      { date: "Jun", low: 80, high: 120 },
    ],
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredTickets = searchQuery
    ? MOCK_TICKETS.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_TICKETS;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-primary/10 to-accent/10 min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-6xl font-black text-primary tracking-tighter mb-2">
            Welcome to Sceney
          </h1>
          <p className="text-3xl text-muted-foreground mb-6">
            Discover, buy, and sell verified tickets for the events you love.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              className="rounded-full font-black text-lg px-8 py-3 shadow-lg shadow-primary/20"
              onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Events
            </Button>
            <Badge className="bg-white/20 text-primary border-primary/30 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
              Verified Only
            </Badge>
          </div>
        </div>
      </section>

      {/* Marketplace Overview */}
      <main id="marketplace" className="container mx-auto px-4 py-12 max-w-5xl flex flex-col">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-black text-primary">Marketplace</h1>
            <div className="flex gap-1">
              {[1, 2].map((i) => (
                <div key={i} className={`h-2 w-8 rounded-full transition-colors ${i === 1 ? 'bg-accent' : 'bg-primary/10'}`} />
              ))}
            </div>
          </div>
          <p className="text-lg text-muted-foreground">Browse events by category or search.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        {/* Example trend chart for demonstration */}
        {filteredTickets.length > 0 && (
          <div className="mt-16 bg-white/50 p-8 rounded-[2.5rem] border-2 border-primary/10">
            <h3 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
              <TrendingUp className="text-accent" />
              Market Price Trends
            </h3>
            <PriceTrendChart 
              data={filteredTickets[0].priceHistory} 
              category="Average Market Price" 
            />
          </div>
        )}
      </main>
    </div>
  );
};

import { TrendingUp } from "lucide-react";
export default Index;