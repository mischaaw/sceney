"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import TicketCard from '@/components/TicketCard';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';

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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="max-w-3xl mb-16">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-primary mb-6 leading-[0.9]">
            Find your next <br />
            <span className="text-accent italic">scene.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            The secure marketplace for verified ticket reselling. 
            Anonymous chatting, 5% flat commission, and guaranteed payouts.
          </p>
          <div className="mt-8 flex gap-4">
            <Button className="rounded-full px-8 h-12 font-bold">Explore Events</Button>
            <Button variant="outline" className="rounded-full px-8 h-12 font-bold border-2">How it works</Button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search events, artists, or venues..." 
              className="pl-12 h-14 rounded-2xl border-2 focus-visible:ring-primary text-lg"
            />
          </div>
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-bold gap-2">
            <Filter size={18} />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_TICKETS.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </main>

      <footer className="border-t py-20 mt-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary p-1 rounded-lg">
                  <img src="/sceney.png" alt="Sceney" className="w-8 h-8" />
                </div>
                <span className="text-2xl font-black text-primary tracking-tighter">sceney</span>
              </div>
              <p className="text-muted-foreground max-w-xs mb-6">
                Redefining the ticket resale experience with security, transparency, and anonymity at its core.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sell Tickets</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Verification</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Escrow Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2024 Sceney Inc. All rights reserved.</p>
            <MadeWithDyad />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;