"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TicketCard from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_TICKETS = [
  {
    id: "1",
    title: "Old City Beer Garden",
    date: "Apr 25, 2026 • 12:00 PM",
    location: "Old City Beer Garden",
    price: 45,
    image: "/src/assets/beer-garden.png",
    category: "Social",
    likes: 124,
  },
  {
    id: "4",
    title: "Ivy League Gala",
    date: "Jun 15, 2026 • 8:00 PM",
    location: "The Bellevue Hotel",
    price: 150,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
    category: "Social",
    likes: 210,
  }
];

const CATEGORIES = ["All", "Social", "Sports", "Arts", "Professional"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTickets = selectedCategory === "All" 
    ? MOCK_TICKETS 
    : MOCK_TICKETS.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <section className="relative overflow-hidden bg-primary py-24 px-4">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">The Scene is Waiting</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
            GET IN THE <span className="text-accent italic">SCENE.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
            The most secure, anonymous marketplace for verified Penn event tickets. No scams, just vibes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="rounded-full font-black text-xl px-10 h-20 shadow-2xl shadow-accent/20 bg-accent hover:bg-accent/90 text-white border-none"
              onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Marketplace
              <ArrowRight className="ml-2" size={24} />
            </Button>
          </div>
        </div>
      </section>

      <main id="marketplace" className="container mx-auto px-4 py-20 max-w-5xl flex flex-col">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-12 bg-accent rounded-full" />
              <h2 className="text-4xl font-black text-primary tracking-tight">Live Listings</h2>
            </div>
            <p className="text-lg text-muted-foreground font-medium">Verified tickets available right now.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full font-black text-[10px] uppercase tracking-widest px-6 h-10 border-2",
                  selectedCategory === cat ? "bg-primary text-white border-primary" : "border-primary/10 text-primary/60 hover:border-primary/30"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <div className="py-20 text-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-primary/10">
              <Filter className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-2xl font-black text-primary">No listings found</h3>
              <p className="text-muted-foreground font-medium">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;