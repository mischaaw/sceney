"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TicketCard from "@/components/TicketCard";
import LiveActivityTicker from "@/components/LiveActivityTicker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, ShieldCheck, Search, FilterX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_TICKETS = [
  {
    id: "1",
    title: "Old City Beer Garden",
    date: "Apr 25, 2026 • 12:00 PM",
    location: "Old City Beer Garden",
    price: 45,
    image: "/src/assets/beer-garden-sign.png",
    category: "Social",
    likes: 42,
    rating: 4.8
  },
  {
    id: "tropics",
    title: "Tropics",
    date: "May 08, 2026 • 2:30 PM",
    location: "Funtown Beach",
    price: 80,
    image: "/src/assets/tropics.png",
    category: "Social",
    likes: 128,
    rating: 4.9
  },
  {
    id: "magic-gardens",
    title: "Magic Gardens",
    date: "Apr 17, 2026 • 9:00 PM",
    location: "5142 Warren street",
    price: 50,
    image: "/src/assets/magic.jpg",
    category: "Music",
    likes: 64,
    rating: 4.7
  },
  {
    id: "battleship-brunch",
    title: "Battleship Brunch",
    date: "Apr 17, 2026 • 1:00 PM",
    location: "62 Battleship Pl Camden, NJ",
    price: 55,
    image: "/src/assets/battleship.png",
    category: "Social",
    likes: 89,
    rating: 4.5
  }
];

const CATEGORIES = ['All', 'Social', 'Music', 'Sports'];

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredTickets = MOCK_TICKETS.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ticket.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <section className="relative pt-24 pb-36 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-accent text-white border-none px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] animate-in fade-in slide-in-from-bottom-4 duration-700">
              The Scene Starts Here
            </Badge>
            
            <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Join the <span className="text-accent italic">scene.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              The most secure, anonymous Penn marketplace for verified event tickets. No scams, just scenes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <div className="relative w-full max-w-md group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" size={20} />
                <Input 
                  placeholder="Search events, venues, or scenes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-16 pl-14 pr-6 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl focus-visible:ring-accent focus-visible:border-accent font-bold text-lg text-white placeholder:text-white/30"
                />
              </div>
              <Button 
                className="h-16 px-10 rounded-2xl font-black text-lg shadow-xl shadow-accent/20 bg-accent hover:bg-accent/90 text-white hover:scale-105 transition-transform border-none"
                onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Now
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-12 animate-in fade-in duration-1000 delay-500">
              <div className="flex items-center gap-3 text-white/40 font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck className="text-[#fdf5e6]" size={18} />
                Escrow Protected
              </div>
              <div className="flex items-center gap-3 text-white/40 font-black text-[10px] uppercase tracking-widest">
                <Zap className="text-[#fdf5e6]" size={18} />
                Instant Delivery
              </div>
              <div className="flex items-center gap-3 text-white/40 font-black text-[10px] uppercase tracking-widest">
                <TrendingUp className="text-[#fdf5e6]" size={18} />
                Verified Only
              </div>
            </div>
          </div>
        </div>
      </section>

      <LiveActivityTicker />

      <main id="marketplace" className="container mx-auto px-4 py-20 max-w-6xl flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tighter">Live Marketplace</h2>
            <p className="text-lg text-muted-foreground font-medium mt-2">Real-time listings from verified students.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <Button 
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'} 
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full font-black text-[10px] uppercase tracking-widest px-6 shrink-0 transition-all",
                  selectedCategory === cat ? "shadow-lg shadow-primary/20" : "border-2 hover:bg-primary/5"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <TicketCard ticket={ticket} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 space-y-6 bg-white/50 rounded-[3rem] border-2 border-dashed border-primary/10"
              >
                <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center text-muted-foreground">
                  <FilterX size={40} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-primary tracking-tight">No scenes found</h3>
                  <p className="text-muted-foreground font-medium">Try adjusting your search or category filters.</p>
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-full font-black text-[10px] uppercase tracking-widest px-8 border-2"
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-32 bg-primary text-white rounded-[3rem] p-10 flex flex-col justify-center space-y-6 shadow-2xl shadow-primary/20 max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg mx-auto">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h3 className="text-3xl font-black tracking-tighter leading-tight">
            Buy with total <span className="text-accent italic">confidence.</span>
          </h3>
          <p className="text-white/70 font-medium leading-relaxed">
            Every transaction is held in escrow. Sellers only get paid after you've successfully entered the event.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;