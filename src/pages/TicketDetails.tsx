"use client";

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  User, 
  ArrowLeft, 
  Zap,
  Heart,
  Bell, 
  BellOff,
  TrendingUp,
  ShieldAlert,
  Lock,
  Scale
} from 'lucide-react';
import PriceTrendChart from '@/components/PriceTrendChart';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listings, setListings] = useState([
    { id: 'L1', seller: 'BrewMaster', price: 45, section: 'General Admission', verified: true, instant: true, likes: 42, notified: false, userLiked: false },
    { id: 'L2', seller: 'SunnyDays', price: 42, section: 'General Admission', verified: true, instant: true, likes: 18, notified: false, userLiked: false },
    { id: 'L3', seller: 'PennFan2024', price: 48, section: 'VIP Deck', verified: true, instant: true, likes: 5, notified: false, userLiked: false },
  ]);

  const events: Record<string, any> = {
    "1": {
      id: "1",
      title: 'Old City Beer Garden',
      date: 'Apr 25, 2026 • 12:00 PM',
      location: 'Old City Beer Garden',
      image: '/src/assets/beer-garden-sign.png',
      category: 'Social',
      description: '21+ | Eden had rules. We just have a bar and a band.',
      priceHistory: [
        { date: 'Oct 18', low: 40, high: 60 },
        { date: 'Oct 19', low: 42, high: 62 },
        { date: 'Oct 20', low: 38, high: 58 },
        { date: 'Oct 21', low: 45, high: 65 },
        { date: 'Oct 22', low: 48, high: 70 },
        { date: 'Oct 23', low: 50, high: 75 },
        { date: 'Oct 24', low: 52, high: 80 },
      ],
    },
    "tropics": {
      id: "tropics",
      title: 'Tropics',
      date: 'May 08, 2026 • 2:30 PM',
      location: 'Funtown Beach',
      image: '/src/assets/tropics.png',
      category: 'Social',
      description: 'Dive deep with us to an evening in paradise, where the isle dances aflame and laughter echoes throughout the ocean breeze. Get ready to dance the night away with infectious tunes and unforgettable company, but don’t let the tide sweep you away… Join us for TROPICS - a celebration to cap off an incredible year and begin the summer. Introducing a live band for the first time, your ticket will also include transportation to and from the beach and an open bar. 18+ to enter and 21+ to drink at our open bar. Invite only-- ticket approval is required, and no ticket transfers will be accepted.',
      priceHistory: [
        { date: 'Oct 18', low: 60, high: 80 },
        { date: 'Oct 19', low: 62, high: 82 },
        { date: 'Oct 20', low: 65, high: 85 },
        { date: 'Oct 21', low: 68, high: 90 },
        { date: 'Oct 22', low: 70, high: 95 },
        { date: 'Oct 23', low: 75, high: 100 },
        { date: 'Oct 24', low: 80, high: 110 },
      ],
    }
  };

  const event = events[id || "1"] || events["1"];

  const toggleLike = (listingId: string) => {
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        if (l.userLiked) {
          showError("You've already liked this listing!");
          return l;
        }
        showSuccess("Seller liked!");
        return { ...l, likes: l.likes + 1, userLiked: true };
      }
      return l;
    }));
  };

  const toggleNotify = (listingId: string) => {
    setListings(prev => prev.map(l => 
      l.id === listingId ? { ...l, notified: !l.notified } : l
    ));
    const listing = listings.find(l => l.id === listingId);
    showSuccess(listing?.notified ? "Notifications disabled" : "You'll be notified of price drops!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl flex-1">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-8 gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-black">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <Badge className="absolute top-8 left-8 bg-accent text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] border-none">
                {event.category}
              </Badge>
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-5xl font-black text-white tracking-tighter mb-2">{event.title}</h1>
                <div className="flex gap-6 text-white/80 font-bold text-sm">
                  <span className="flex items-center gap-2"><Calendar size={18} className="text-accent" /> {event.date}</span>
                  <span className="flex items-center gap-2"><MapPin size={18} className="text-accent" /> {event.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">About the Event</h3>
              <p className="text-lg text-primary leading-relaxed font-medium">
                {event.description}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Available Listings</h3>
                <Badge variant="outline" className="border-2 font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full">
                  {listings.length} Sellers
                </Badge>
              </div>
              
              <div className="grid gap-6">
                {listings.map((listing) => (
                  <Card 
                    key={listing.id} 
                    className="border-2 border-primary/5 hover:border-primary/20 transition-all rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1"
                  >
                    <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center">
                            <User className="text-primary" size={32} />
                          </div>
                          {listing.verified && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-white">
                              <ShieldCheck size={14} />
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="text-2xl font-black text-primary tracking-tight">{listing.seller}</h4>
                            <button 
                              onClick={() => toggleLike(listing.id)}
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors",
                                listing.userLiked ? "bg-red-500 text-white" : "bg-red-50 text-red-500 hover:bg-red-100"
                              )}
                            >
                              <Heart size={14} fill={listing.userLiked ? "white" : "currentColor"} />
                              <span className="text-[10px] font-black">{listing.likes}</span>
                            </button>
                          </div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{listing.section}</p>
                          {listing.instant && (
                            <div className="flex items-center gap-2 text-accent">
                              <Zap size={14} fill="currentColor" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Instant Delivery</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Price</p>
                          <p className="text-4xl font-black text-primary tracking-tighter">${listing.price}</p>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">+ 3% Sceney Fee</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button 
                            onClick={() => navigate('/checkout/' + listing.id)}
                            className="rounded-2xl px-8 h-14 font-black shadow-xl shadow-primary/20"
                          >
                            Buy Now
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleNotify(listing.id)}
                            className={`rounded-xl border-2 font-black text-[10px] uppercase tracking-widest h-10 gap-2 ${listing.notified ? 'bg-accent text-white border-accent' : ''}`}
                          >
                            {listing.notified ? <BellOff size={14} /> : <Bell size={14} />}
                            {listing.notified ? 'Notifying' : 'Notify Drops'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <CardHeader className="p-8 border-b bg-muted/10">
                <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
                  <TrendingUp className="text-accent" size={24} />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <PriceTrendChart 
                  data={event.priceHistory} 
                  category={event.title} 
                />
                <div className="mt-8 p-6 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/10">
                  <p className="text-xs font-bold text-primary leading-relaxed">
                    Prices for <span className="font-black">{event.title}</span> have increased by <span className="text-accent font-black">12%</span> in the last 30 days. Secure your spot before they rise further.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-primary text-white">
              <CardContent className="p-8 space-y-6">
                <h4 className="text-xl font-black tracking-tight flex items-center gap-3">
                  <ShieldAlert className="text-accent" size={24} />
                  Sceney Guarantee
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} className="text-background" />
                    </div>
                    <div>
                      <p className="font-black text-sm">Verified Sellers</p>
                      <p className="text-xs opacity-60">Every seller is identity-verified.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Zap size={20} className="text-background" />
                    </div>
                    <div>
                      <p className="font-black text-sm">Instant Transfer</p>
                      <p className="text-xs opacity-60">Digital tickets sent immediately.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Lock size={20} className="text-background" />
                    </div>
                    <div>
                      <p className="font-black text-sm">Escrow Protection</p>
                      <p className="text-xs opacity-60">Funds held until event entry.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Scale size={20} className="text-background" />
                    </div>
                    <div>
                      <p className="font-black text-sm">Fair Pricing</p>
                      <p className="text-xs opacity-60">Anti-scalping measures active.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TicketDetails;