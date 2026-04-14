"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import TicketCard from '@/components/TicketCard';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShieldCheck, Zap, Lock, MessageSquare, ChevronDown } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MOCK_TICKETS = [
  {
    id: '1',
    title: 'Midnight Jazz Festival',
    date: 'Oct 24, 2024 • 8:00 PM',
    location: 'Blue Note Lounge, NYC',
    price: 120,
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&q=80&w=800',
    category: 'Music'
  },
  {
    id: '2',
    title: 'Tech Vision Summit 2024',
    date: 'Nov 12, 2024 • 9:00 AM',
    location: 'Convention Center, SF',
    price: 450,
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800',
    category: 'Conference'
  },
  {
    id: '3',
    title: 'The Art of Motion',
    date: 'Oct 30, 2024 • 7:30 PM',
    location: 'Modern Art Museum, CHI',
    price: 85,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    category: 'Exhibition'
  },
  {
    id: '4',
    title: 'Championship Finals',
    date: 'Dec 05, 2024 • 6:00 PM',
    location: 'Madison Square Garden',
    price: 299,
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800',
    category: 'Sports'
  },
  {
    id: '5',
    title: 'Broadway: The Lion King',
    date: 'Nov 05, 2024 • 7:00 PM',
    location: 'Minskoff Theatre, NYC',
    price: 180,
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=800',
    category: 'Theater'
  },
  {
    id: '6',
    title: 'Indie Rock Night',
    date: 'Oct 28, 2024 • 9:00 PM',
    location: 'The Garage, London',
    price: 45,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    category: 'Music'
  }
];

const CATEGORIES = ['All', 'Music', 'Sports', 'Conference', 'Exhibition', 'Theater'];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recency');

  const filteredTickets = useMemo(() => {
    let result = MOCK_TICKETS.filter(ticket => {
      const matchesCategory = activeCategory === 'All' || ticket.category === activeCategory;
      const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           ticket.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'date-soonest') {
      result.sort((a, b) => new Date(a.date.split(' • ')[0]).getTime() - new Date(b.date.split(' • ')[0]).getTime());
    }
    
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="max-w-3xl mb-16">
          <Badge className="mb-4 bg-accent text-white border-none px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
            Secure Ticket Resale
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-primary mb-6 leading-[0.85]">
            Find your next <br />
            <span className="text-accent italic">scene.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed font-medium">
            The secure marketplace for verified ticket reselling. 
            Anonymous chatting, 5% flat commission, and guaranteed payouts.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button className="rounded-full px-10 h-14 font-black text-lg shadow-2xl shadow-primary/20">Explore Events</Button>
            <Button variant="outline" className="rounded-full px-10 h-14 font-black text-lg border-2">How it works</Button>
          </div>
        </header>

        {/* Search & Filter Section */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search events, artists, or venues..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-16 rounded-[1.5rem] border-2 focus-visible:ring-primary text-lg font-medium shadow-sm"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-16 px-8 rounded-[1.5rem] border-2 font-black gap-3 text-primary w-full md:w-[240px] bg-white">
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-accent" />
                  <SelectValue placeholder="Sort By" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2">
                <SelectItem value="recency" className="font-bold py-3">Recently Added</SelectItem>
                <SelectItem value="price-low" className="font-bold py-3">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="font-bold py-3">Price: High to Low</SelectItem>
                <SelectItem value="date-soonest" className="font-bold py-3">Event Date: Soonest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                  activeCategory === cat 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                    : 'bg-white text-primary/60 border-primary/5 hover:border-primary/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Marketplace Grid */}
        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/50 rounded-[3rem] border-2 border-dashed border-primary/10 mb-24">
            <Search className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-2xl font-black text-primary">No scenes found</h3>
            <p className="text-muted-foreground mt-2 font-medium">Try adjusting your search or filters.</p>
            <Button 
              variant="link" 
              className="mt-4 font-black text-accent uppercase tracking-widest text-xs"
              onClick={() => {setSearchQuery(''); setActiveCategory('All'); setSortBy('recency');}}
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* How it Works Section */}
        <section className="bg-white rounded-[3rem] p-12 md:p-20 border-2 border-primary/5 shadow-2xl mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-primary mb-4">Built for <span className="text-accent italic">trust.</span></h2>
            <p className="text-lg text-muted-foreground font-medium">We've redesigned the resale experience to eliminate scams and high fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 text-center md:text-left">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto md:mx-0">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-black text-primary tracking-tight">Secure Escrow</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Your money is held safely by Sceney and only released to the seller after you've successfully entered the event.
              </p>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto md:mx-0">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-2xl font-black text-primary tracking-tight">Anonymous Chat</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Communicate with buyers and sellers without sharing personal info. Our monitored chat keeps everyone safe.
              </p>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mx-auto md:mx-0">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black text-primary tracking-tight">Flat 5% Fee</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                No hidden charges. We take a flat 5% commission to cover secure processing and platform maintenance.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-muted-foreground max-w-xs mb-6 font-medium">
                Redefining the ticket resale experience with security, transparency, and anonymity at its core.
              </p>
            </div>
            <div>
              <h4 className="font-black mb-4 uppercase tracking-widest text-[10px] text-primary">Platform</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-bold">
                <li><a href="#" className="hover:text-primary transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sell Tickets</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Verification</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Escrow Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 uppercase tracking-widest text-[10px] text-primary">Support</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-bold">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">© 2024 Sceney Inc. All rights reserved.</p>
            <MadeWithDyad />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;