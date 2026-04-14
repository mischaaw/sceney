"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import TicketCard from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const MOCK_TICKETS = [
  {
    id: "1",
    title: "Old City Beer Garden",
    date: "Apr 25, 2026 • 12:00 PM",
    location: "Old City Beer Garden",
    price: 45,
    image: "dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png",
    category: "Social",
    likes: 124,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <section className="relative overflow-hidden bg-primary py-24 px-4">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8 animate-bounce">
            <Sparkles size={16} className="text-accent" />
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
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-12 bg-accent rounded-full" />
              <h2 className="text-4xl font-black text-primary tracking-tight">Live Listings</h2>
            </div>
            <p className="text-lg text-muted-foreground font-medium">Verified tickets available right now.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {MOCK_TICKETS.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;