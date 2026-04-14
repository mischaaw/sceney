"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TicketCard from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PriceTrendChart from "@/components/PriceTrendChart";
import { TrendingUp, Zap, ShieldCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.05),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-accent/10 text-accent border-none px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] animate-in fade-in slide-in-from-bottom-4 duration-700">
              The Scene Starts Here
            </Badge>
            
            <h1 className="text-7xl md:text-8xl font-black text-primary tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Secure the <span className="text-accent italic">scene.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              The most secure, anonymous marketplace for verified event tickets. No scams, just scenes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <div className="relative w-full max-w-md group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                <Input 
                  placeholder="Search events, venues, or scenes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-16 pl-14 pr-6 rounded-2xl border-2 border-primary/5 bg-white shadow-xl shadow-primary/5 focus-visible:ring-accent focus-visible:border-accent font-bold text-lg"
                />
              </div>
              <Button 
                className="h-16 px-10 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Now
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-12 animate-in fade-in duration-1000 delay-500">
              <div className="flex items-center gap-3 text-primary/60 font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck className="text-accent" size={18} />
                Escrow Protected
              </div>
              <div className="flex items-center gap-3 text-primary/60 font-black text-[10px] uppercase tracking-widest">
                <Zap className="text-accent" size={18} />
                Instant Delivery
              </div>
              <div className="flex items-center gap-3 text-primary/60 font-black text-[10px] uppercase tracking-widest">
                <TrendingUp className="text-accent" size={18} />
                Verified Only
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <main id="marketplace" className="container mx-auto px-4 py-20 max-w-6xl flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tighter">Live Marketplace</h2>
            <p className="text-lg text-muted-foreground font-medium mt-2">Real-time listings from verified fans.</p>
          </div>
          <div className="flex gap-2">
            {['All', 'Social', 'Music', 'Sports'].map((cat) => (
              <Button 
                key={cat}
                variant={cat === 'All' ? 'default' : 'outline'} 
                className={cn(
                  "rounded-full font-black text-[10px] uppercase tracking-widest px-6",
                  cat !== 'All' && "border-2"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        {/* Market Insights */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border-2 border-primary/5 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-primary tracking-tight flex items-center gap-3">
                <TrendingUp className="text-accent" size={28} />
                Market Price Trends
              </h3>
              <Badge variant="outline" className="border-2 font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full">
                Last 30 Days
              </Badge>
            </div>
            <PriceTrendChart 
              data={MOCK_TICKETS[0].priceHistory} 
              category="Average Market Price" 
            />
          </div>

          <div className="bg-primary text-white rounded-[3rem] p-10 flex flex-col justify-center space-y-6 shadow-2xl shadow-primary/20">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-black tracking-tighter leading-tight">
              Buy with total <span className="text-accent italic">confidence.</span>
            </h3>
            <p className="text-white/70 font-medium leading-relaxed">
              Every transaction is held in escrow. Sellers only get paid after you've successfully entered the event.
            </p>
            <Button variant="outline" className="w-full h-14 rounded-2xl font-black border-white/20 hover:bg-white hover:text-primary transition-all">
              Learn About Safety
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;