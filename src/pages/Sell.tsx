"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info, DollarSign, ShieldCheck, UploadCloud, CheckCircle2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Sell = () => {
  const [price, setPrice] = useState<string>('');
  const [step, setStep] = useState(1);
  const commission = Number(price) * 0.05;
  const payout = Number(price) - commission;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      showSuccess("Listing created! It will be visible after verification.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-black text-primary">List your tickets</h1>
            <div className="flex gap-1">
              {[1, 2].map((i) => (
                <div key={i} className={`h-2 w-8 rounded-full transition-colors ${step >= i ? 'bg-accent' : 'bg-primary/10'}`} />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground">Secure, anonymous, and guaranteed payouts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 ? (
            <>
              <Card className="border-2 shadow-xl rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/10">
                  <CardTitle className="text-2xl font-black tracking-tight">Event Details</CardTitle>
                  <CardDescription className="font-medium">Provide accurate information about the event.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Event Name</Label>
                    <Input id="title" placeholder="e.g. Taylor Swift | The Eras Tour" required className="h-14 rounded-xl border-2 font-bold" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Date & Time</Label>
                      <Input id="date" type="datetime-local" required className="h-14 rounded-xl border-2 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Venue / Location</Label>
                      <Input id="location" placeholder="e.g. Wembley Stadium" required className="h-14 rounded-xl border-2 font-bold" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Additional Info</Label>
                    <Textarea id="description" placeholder="Section, Row, Seat details..." className="min-h-[120px] rounded-xl border-2 font-medium" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-xl bg-primary text-primary-foreground rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-white/10 bg-white/5">
                  <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                    <DollarSign className="text-accent" />
                    Pricing & Commission
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/70 font-medium">
                    Sceney takes a flat 5% commission to ensure secure transactions.
                  </CardDescription>
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
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Sceney Fee (5%)</p>
                      <p className="text-3xl font-black text-accent">-${commission.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Your Payout</p>
                      <p className="text-3xl font-black text-green-400">${payout > 0 ? payout.toFixed(2) : '0.00'}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl flex gap-4 items-start border border-white/10">
                    <ShieldCheck className="text-accent shrink-0 mt-1" size={24} />
                    <p className="text-sm leading-relaxed opacity-80 font-medium">
                      Payouts are held in escrow and released to your account once the buyer confirms entry or 24 hours after the event ends.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full h-20 text-xl font-black rounded-[2rem] shadow-2xl shadow-primary/30">
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
                    Upload your ticket file or a screenshot of the confirmation.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-8">
                <div className="border-4 border-dashed border-primary/5 rounded-[2rem] p-12 text-center space-y-4 hover:border-accent/20 transition-colors cursor-pointer bg-muted/5">
                  <p className="font-black text-primary uppercase tracking-widest text-xs">Drag and drop or click to upload</p>
                  <p className="text-sm text-muted-foreground font-medium">PDF, JPG, or PNG (Max 10MB)</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-6 bg-green-50 rounded-2xl border-2 border-green-100">
                    <CheckCircle2 className="text-green-600 shrink-0 mt-1" size={20} />
                    <p className="text-sm font-bold text-green-800 leading-relaxed">
                      Verified listings sell 4x faster and build immediate trust with buyers.
                    </p>
                  </div>
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
    </div>
  );
};

export default Sell;