"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info, DollarSign, ShieldCheck } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Sell = () => {
  const [price, setPrice] = useState<string>('');
  const commission = Number(price) * 0.05;
  const payout = Number(price) - commission;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Listing created! It will be visible after verification.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-primary mb-2">List your tickets</h1>
          <p className="text-muted-foreground">Secure, anonymous, and guaranteed payouts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Provide accurate information about the event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Name</Label>
                <Input id="title" placeholder="e.g. Taylor Swift | The Eras Tour" required className="h-12" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date & Time</Label>
                  <Input id="date" type="datetime-local" required className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Venue / Location</Label>
                  <Input id="location" placeholder="e.g. Wembley Stadium" required className="h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Info</Label>
                <Textarea id="description" placeholder="Section, Row, Seat details..." className="min-h-[100px]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="text-accent" />
                Pricing & Commission
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Sceney takes a flat 5% commission to ensure secure transactions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-primary-foreground">Your Asking Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00" 
                  className="h-14 text-2xl font-bold bg-white/10 border-white/20 text-white placeholder:text-white/30" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Sceney Fee (5%)</p>
                  <p className="text-xl font-bold text-accent">-${commission.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Your Payout</p>
                  <p className="text-xl font-bold text-green-400">${payout > 0 ? payout.toFixed(2) : '0.00'}</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl flex gap-3 items-start">
                <ShieldCheck className="text-accent shrink-0 mt-1" size={20} />
                <p className="text-xs leading-relaxed opacity-80">
                  Payouts are held in escrow and released to your account once the buyer confirms entry or 24 hours after the event ends, similar to StubHub protection.
                </p>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full h-16 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30">
            Create Listing
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Sell;