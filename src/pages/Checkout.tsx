"use client";

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Lock, CreditCard, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    showSuccess("Payment secured in escrow!");
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-2 shadow-2xl rounded-[2.5rem] text-center p-10 space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-3xl font-black text-primary tracking-tighter">Payment Secured</h1>
            <p className="text-muted-foreground font-medium">
              Your funds are now held in Sceney's secure escrow. The seller has been notified to transfer your tickets.
            </p>
            <div className="bg-muted/30 p-6 rounded-2xl text-left space-y-4">
              <div className="flex gap-3">
                <ShieldCheck className="text-accent shrink-0" size={20} />
                <p className="text-xs font-bold text-primary leading-relaxed">
                  The seller will NOT receive payment until you confirm entry or 24 hours after the event ends.
                </p>
              </div>
            </div>
            <Button 
              className="w-full h-14 rounded-2xl font-black"
              onClick={() => navigate('/messages')}
            >
              Go to Chat with Seller
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 gap-2 font-bold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Details
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h1 className="text-4xl font-black text-primary tracking-tighter">Secure Checkout</h1>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input id="card-name" placeholder="John Doe" required className="h-12 rounded-xl border-2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <Input id="card-number" placeholder="0000 0000 0000 0000" required className="h-12 rounded-xl border-2 pl-12" />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required className="h-12 rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required className="h-12 rounded-xl border-2" />
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border-2 border-primary/10 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Lock size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">Secure Escrow Payment</span>
                </div>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                  By clicking "Pay Now", you agree to Sceney's escrow terms. Your payment is held securely and only released to the seller after the event.
                </p>
              </div>

              <Button type="submit" className="w-full h-16 text-lg font-black rounded-2xl shadow-xl shadow-primary/20">
                Pay $126.00 Now
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <Card className="border-2 shadow-xl rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="bg-muted/20 border-b p-6">
                <CardTitle className="text-lg font-black tracking-tight">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Midnight Jazz Festival</h3>
                    <p className="text-xs text-muted-foreground font-medium">Oct 24, 2024 • 2 Tickets</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$120.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Sceney Fee (5%)</span>
                    <span className="text-accent">$6.00</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-black text-primary uppercase tracking-widest text-xs">Total</span>
                    <span className="font-black text-2xl text-primary tracking-tighter">$126.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;