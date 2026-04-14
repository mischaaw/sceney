"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info, DollarSign, ShieldCheck, UploadCloud, CheckCircle2, Search, Calendar, MapPin } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Beer Garden',
    date: 'Apr 25, 2026 • 2:00 PM',
    location: 'The Emerald Terrace',
    image: 'dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png',
    category: 'Social'
  }
];

const Sell = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState<string>('');
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<typeof MOCK_EVENTS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const commission = 0; 
  const payout = Number(price); 

  const filteredEvents = MOCK_EVENTS.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && selectedEvent) {
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      showSuccess("Listing submitted for verification!");
      navigate('/sell/success');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl flex-1">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-black text-primary">List your tickets</h1>
            <div className="flex gap-1">
              {[1, 2].map((i) => (
                <div key={i} className={`h-2 w-8 rounded-full transition-colors ${step >= i ? 'bg-accent' : 'bg-primary/10'}`} />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground">Select an event and set your price.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 ? (
            <>
              <Card className="border-2 shadow-xl rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/10">
                  <CardTitle className="text-2xl font-black tracking-tight">1. Select Event</CardTitle>
                  <CardDescription className="font-medium">Only verified events are available for listing.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      placeholder="Search for an event..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 rounded-xl border-2 font-bold"
                    />
                  </div>

                  <div className="space-y-3">
                    {filteredEvents.map(event => (
                      <div 
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                          selectedEvent?.id === event.id ? 'border-primary bg-primary/5 shadow-md' : 'border-primary/5 hover:border-primary/20'
                        }`}
                      >
                        <img src={event.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                        <div className="flex-1">
                          <h4 className="font-black text-primary">{event.title}</h4>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                            <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                          </div>
                        </div>
                        {selectedEvent?.id === event.id && <CheckCircle2 className="text-primary" size={24} />}
                      </div>
                    ))}
                  </div>

                  {selectedEvent && (
                    <div className="pt-6 border-t space-y-4 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <Label htmlFor="description" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Ticket Details</Label>
                        <Textarea id="description" placeholder="Section, Row, Seat details..." className="min-h-[100px] rounded-xl border-2 font-medium" required />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedEvent && (
                <Card className="border-2 shadow-xl bg-primary text-primary-foreground rounded-[2rem] overflow-hidden">
                  <CardHeader className="p-8 border-b border-white/10 bg-white/5">
                    <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                      <DollarSign className="text-accent" />
                      Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="font-black text-[10px] uppercase tracking-widest text-primary-foreground/60">Your Asking Price ($)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00" 
                        className="h-20 text-4xl font-black bg-white/10 border-white/20 text-white placeholder:text-white/20 rounded-2xl px-6" 
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Platform Fee</p>
                        <p className="text-3xl font-black text-primary">$0.00</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Your Payout</p>
                        <p className="text-3xl font-black text-green-400">${payout > 0 ? payout.toFixed(2) : '0.00'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button 
                type="submit" 
                disabled={!selectedEvent || !price}
                className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
              >
                Continue to Verification
              </Button>
            </>
          ) : (
            <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-10 text-center space-y-4">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mx-auto">
                  <UploadCloud size={40} />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-black tracking-tight">Verify Authenticity</CardTitle>
                  <CardDescription className="text-lg font-medium">
                    Upload your ticket file or a screenshot.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-8">
                <div className="border-4 border-dashed border-primary/5 rounded-[2rem] p-12 text-center space-y-4 hover:border-accent/20 transition-colors cursor-pointer bg-muted/5">
                  <p className="font-black text-primary uppercase tracking-widest text-xs">Drag and drop or click to upload</p>
                  <p className="text-sm text-muted-foreground font-medium">PDF, JPG, or PNG (Max 10MB)</p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-16 rounded-2xl font-black border-2">
                    Back
                  </Button>
                  <Button type="submit" className="flex-[2] h-16 rounded-2xl font-black shadow-xl shadow-primary/20">
                    Create Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Sell;