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
    title: 'Beer Garden',
    date: 'Apr 25, 2026 • 2:00 PM',
    location: 'The Emerald Terrace',
    price: 45,
    image: 'dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png',
    category: 'Social',
    likes: 0,
  },
  {
    id: '2',
    title: 'Jazz Night',
    date: 'May 15, 2026 • 8:00 PM',
    location: 'Blue Note Club',
    price: 65,
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&q=80&w=200',
    category: 'Music',
    likes: 0,
  },
  {
    id: '3',
    title: 'Basketball Championship',
    date: 'Jun 10, 2026 • 7:00 PM',
    location: 'Penn Palestra',
    price: 120,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=200',
    category: 'Sports',
    likes: 0,
  },
  {
    id: '4',
    title: 'Art Exhibition',
    date: 'Jul 5, 2026 • 6:00 PM',
    location: 'ICA Philadelphia',
    price: 25,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=200',
    category: 'Arts',
    likes: 0,
  },
];

const CATEGORIES = ['All', 'Social', 'Music', 'Sports', 'Arts', 'Conference', 'Theater'];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recency');
  const [likes, setLikes] = useState<Record<string, number>>({});

  const filteredTickets = useMemo(() => {
    let result = MOCK_TICKETS.filter(ticket => {
      const matchesCategory = activeCategory === 'All' || ticket.category === activeCategory;
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'date-soonest')
      result.sort(
        (a, b) =>
          new Date(a.date.split(' • ')[0]).getTime() -
          new Date(b.date.split(' • ')[0]).getTime(),
      );

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const handleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const updatedLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    if (updatedLikes[id] > 10) {
      alert(`${MOCK_TICKETS.find(t => t.id === id)!.title} is now trending!`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header, search, filters, etc. (omitted for brevity) */}
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
            <p className="text-muted-foreground mt-2 font-medium">
              Try adjusting your search or filters.
            </p>
            <Button
              variant="link"
              className="mt-4 font-black text-accent uppercase tracking-widest text-xs"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setSortBy('recency');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
        {/* Rest of page (omitted for brevity) */}
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
              <h4 className="font-black mb-4 uppercase tracking-widest text-[10px] text-primary">
                Platform
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-bold">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Marketplace
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Sell Tickets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Verification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Escrow Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 uppercase tracking-widest text-[10px] text-primary">
                Support
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-bold">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Safety Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              © 2024 Sceney Inc. All rights reserved.
            </p>
            <MadeWithDyad />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;