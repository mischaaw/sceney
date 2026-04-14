"use client";

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ShieldCheck, MessageSquare, Info, ArrowLeft, Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, we'd fetch this based on the ID
  const ticket = {
    id: id,
    title: 'Midnight Jazz Festival',
    date: 'Oct 24, 2024 • 8:00 PM',
    location: 'Blue Note Lounge, NYC',
    price: 120,
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&q=80&w=800',
    category: 'Music',
    description: 'Two premium seats in the front row. Digital transfer via the official JazzFest app. Price is per ticket.',
    seller: 'User_4821',
    verified: true
  };

  const commission = ticket.price * 0.05;
  const total = ticket.price + commission;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 gap-2 font-bold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
              <Badge className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">
                {ticket.category}
              </Badge>
            </div>

            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4">
                    {ticket.title}
                  </h1>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                      <Calendar className="text-accent" size={20} />
                      {ticket.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                      <MapPin className="text-accent" size={20} />
                      {ticket.location}
                    </div>
                  </div>
                </div>
                {ticket.verified && (
                  <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 rounded-full flex gap-2 items-center font-bold">
                    <ShieldCheck size={16} />
                    Verified Listing
                  </Badge>
                )}
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-black text-primary uppercase tracking-widest text-xs mb-4">About this listing</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {ticket.description}
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border-2 border-primary/5 shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                    <Ticket className="text-primary" size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Seller</p>
                    <p className="text-lg font-bold text-primary">Anonymous {ticket.seller}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-full px-8 h-12 font-bold border-2 gap-2"
                  onClick={() => navigate('/messages')}
                >
                  <MessageSquare size={18} />
                  Chat with Seller
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden sticky top-24">
              <CardContent className="p-8 space-y-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Price Summary</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-muted-foreground">Ticket Price</span>
                      <span className="font-black text-xl text-primary">${ticket.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-muted-foreground flex items-center gap-2">
                        Sceney Fee (5%)
                        <Info size={14} className="text-accent cursor-help" />
                      </span>
                      <span className="font-black text-xl text-accent">${commission.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t-2 border-dashed flex justify-between items-center">
                      <span className="font-black text-lg text-primary uppercase tracking-tight">Total</span>
                      <span className="font-black text-4xl text-primary tracking-tighter">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full h-16 text-lg font-black rounded-2xl shadow-xl shadow-primary/20"
                    onClick={() => navigate(`/checkout/${id}`)}
                  >
                    Secure Checkout
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <ShieldCheck size={14} className="text-green-500" />
                    Escrow Protection Active
                  </div>
                </div>

                <div className="bg-muted/30 p-6 rounded-2xl space-y-3">
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-primary">How it works</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-xs font-medium text-muted-foreground leading-tight">
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 text-[10px]">1</div>
                      Funds are held securely by Sceney.
                    </li>
                    <li className="flex gap-3 text-xs font-medium text-muted-foreground leading-tight">
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 text-[10px]">2</div>
                      Seller transfers tickets to you.
                    </li>
                    <li className="flex gap-3 text-xs font-medium text-muted-foreground leading-tight">
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 text-[10px]">3</div>
                      Payment released after event entry.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketDetails;