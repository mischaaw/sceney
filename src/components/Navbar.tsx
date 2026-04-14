"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, User, ShieldCheck, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-1 rounded-xl transition-transform group-hover:scale-105">
            <img 
              src="/sceney.png" 
              alt="Sceney Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-2xl font-black tracking-tighter text-primary">sceney</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-sm font-bold uppercase tracking-widest hover:text-primary/70 transition-colors">Marketplace</Link>
          <Link to="/sell" className="text-sm font-bold uppercase tracking-widest hover:text-primary/70 transition-colors flex items-center gap-2">
            <PlusCircle size={16} />
            Sell
          </Link>
          <Link to="/messages" className="text-sm font-bold uppercase tracking-widest hover:text-primary/70 transition-colors flex items-center gap-2">
            <MessageSquare size={16} />
            Inbox
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5" title="Admin Monitor">
              <ShieldCheck className="w-5 h-5 text-primary/60" />
            </Button>
          </Link>
          <Button className="rounded-full px-8 font-bold shadow-lg shadow-primary/20">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;