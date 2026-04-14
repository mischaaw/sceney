"use client";

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  User, 
  ArrowLeft, 
  ChevronRight, 
  Zap
} from 'lucide-react';
import PriceTrendChart from '@/components/PriceTrendChart';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock event data updated to Beer Garden with new image
  const event = {
    id: id,
    title: 'Beer Garden',
    date: 'Apr 25, 2026 • 2:00 PM',
    location: 'The Emerald Terrace',
    image: 'dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png',
    category: 'Social',
    description: 'Join us for an afternoon of craft brews, live music, and great company at the Emerald Terrace. A perfect spring celebration.',
    priceHistory: [
      { date: 'Jan', low: 40, high: 65 },
      { date: 'Feb', low: 42, high: 70 },
      { date: 'Mar', low: 38, high: 68 },
      { date: 'Apr', low: 45, high: 75 },
      { date: 'May', low: 48, high: 80 },
      { date: 'Jun', low: 52, high: 85 },
    ],
  };

  // Mock listings for this event
  const listings = [
    { id: 'L1', seller: 'BrewMaster', price: 45, section: 'General Admission', verified: true, instant: true },
    { id: 'L2', seller: 'SunnyDays', price: 42, section: 'General Admission', verified: true, instant: true },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <Badge className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">
                {event.category}
              </Badge>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-black text-primary tracking-tighter mb-4">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-muted-foreground font-bold">
                    <Calendar className="text-accent" size={20} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground font-bold">
                    <MapPin className="text-accent" size={20} />
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-primary uppercase tracking-widest text-xs">Available Tickets</h3>
                <div className="grid gap-4">
                  {listings.map((listing) => (
                    <Card 
                      key={listing.id} 
                      className={`border-2 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 rounded-[2rem] overflow-hidden ${
                        listing.verified ? 'border-primary shadow-lg' : 'border-primary/5'
                      }`}
                    >
                      <CardContent className="p-6 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                            <User className="text-primary" size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-black text-primary">{listing.seller}</p>
                              {listing.verified && (
                                <ShieldCheck size={14} className="text-green-500" />
                              )}
                            </div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{listing.section}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-accent mb-1">
                              <Zap size={12} fill="currentColor" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Instant Delivery</span>
                            </div>
                            <p className="text-2xl font-black text-primary">${listing.price}</p>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">+ 5% Sceney Fee</p>
                          </div>
                          <Button 
                            onClick={() => navigate('/checkout/' + listing.id)}
                            className="rounded-full px-6 font-black group-hover:bg-accent group-hover:text-white transition-colors"
                          >
                            Buy Now
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden sticky top-24 bg-primary text-white">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-black tracking-tight">Why buy on Sceney?</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    We ensure every ticket is verified and delivered instantly to your inbox.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Zap size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-black text-sm">Instant Email Delivery</p>
                      <p className="text-xs opacity-60">Tickets are sent immediately after payment.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="font-black text-sm">Escrow Protection</p>
                      <p className="text-xs opacity-60">Funds held until you enter the event.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Trusted by Penn students</p>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-secondary flex items-center justify-center">
                        <User size={16} className="text-primary" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-accent flex items-center justify-center text-[10px] font-black">
                      +12
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-white/50 p-6 rounded-2xl border-2 border-primary/10 text-center">
          <PriceTrendChart 
            data={event.priceHistory} 
            category={event.title} 
          />
        </div>
      </main>
    </div>
  );
};

export default TicketDetails;