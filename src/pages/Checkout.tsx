"use client";

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShieldCheck, 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  Mail, 
  Zap,
  Smartphone,
  Globe,
  Send,
  Lock,
  Loader2
} from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

// Stripe Imports
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Initialize Stripe with a placeholder key
// In a real app, this would be your Stripe Publishable Key
const stripePromise = loadStripe('pk_test_51PzXpP2N8vXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXvXv00XvXvXvXv');

const StripeCheckoutForm = ({ amount, email, onSuccess }: { amount: number, email: string, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    // Use Stripe to create a payment method - this validates the card info
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: email,
      },
    });

    if (error) {
      showError(error.message || "An error occurred with your card.");
      setIsProcessing(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // In a real app, you would send paymentMethod.id to your server here
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="p-6 bg-white border-2 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Stripe Secure Payment</span>
            <div className="flex gap-1">
              <div className="w-6 h-4 bg-muted rounded-sm" />
              <div className="w-6 h-4 bg-muted rounded-sm" />
              <div className="w-6 h-4 bg-muted rounded-sm" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest">Card Information</Label>
            <div className="p-4 border-2 rounded-xl bg-white">
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#1a2634',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#ef4444',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-[10px] font-black uppercase tracking-widest">Country or Region</Label>
            <select id="country" className="w-full h-12 rounded-xl border-2 px-4 bg-white font-bold text-sm">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground justify-center">
          <Lock size={12} />
          Payments are secure and encrypted by Stripe
        </div>
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl border-2 border-primary/10 space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Zap size={18} className="text-accent" fill="currentColor" />
          <span className="font-black text-xs uppercase tracking-widest">Instant Delivery Enabled</span>
        </div>
        <p className="text-xs font-medium text-muted-foreground leading-relaxed">
          Tickets will be emailed immediately after payment. Your funds are protected by our escrow system.
        </p>
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full h-16 text-lg font-black rounded-2xl shadow-xl shadow-primary/20"
      >
        {isProcessing ? (
          <Loader2 className="animate-spin" />
        ) : (
          `Pay $${amount.toFixed(2)} Now`
        )}
      </Button>
    </form>
  );
};

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [email, setEmail] = useState('alex@example.com');

  const handleSuccess = () => {
    setStep(2);
    showSuccess("Payment successful! Check your email for receipt.");
    
    setTimeout(() => {
      showSuccess(`Receipt emailed to buyer (${email})`);
      showSuccess(`Receipt emailed to seller (seller@example.com)`);
    }, 1500);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-2 shadow-2xl rounded-[3rem] text-center p-12 space-y-8">
            <div className="relative mx-auto w-24 h-24">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 size={56} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-accent text-white p-2 rounded-xl shadow-lg">
                <Zap size={20} fill="currentColor" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-primary tracking-tighter">Tickets Sent!</h1>
              <p className="text-muted-foreground font-medium">
                We've just emailed your tickets to <span className="text-primary font-bold">{email}</span>.
              </p>
            </div>

            <div className="bg-muted/30 p-6 rounded-2xl text-left space-y-4 border-2 border-primary/5">
              <div className="flex gap-3">
                <Mail className="text-accent shrink-0" size={20} />
                <p className="text-xs font-bold text-primary leading-relaxed">
                  The seller has also been notified that their ticket has sold.
                </p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="text-green-600 shrink-0" size={20} />
                <p className="text-xs font-bold text-primary leading-relaxed">
                  Your payment is held in escrow until 24h after the event for your protection.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                onClick={() => navigate('/dashboard')}
              >
                View in Dashboard
              </Button>
              <Button 
                variant="ghost"
                className="w-full font-bold text-muted-foreground"
                onClick={() => navigate('/')}
              >
                Back to Marketplace
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 gap-2 font-bold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h1 className="text-4xl font-black text-primary tracking-tight">Secure Checkout</h1>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Select Payment Method</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all",
                      paymentMethod === 'card' ? "border-primary bg-primary text-white shadow-lg" : "border-primary/5 bg-white text-primary/60 hover:border-primary/20"
                    )}
                  >
                    <CreditCard size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('apple')}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all",
                      paymentMethod === 'apple' ? "border-primary bg-primary text-white shadow-lg" : "border-primary/5 bg-white text-primary/60 hover:border-primary/20"
                    )}
                  >
                    <Smartphone size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Apple Pay</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('google')}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all",
                      paymentMethod === 'google' ? "border-primary bg-primary text-white shadow-lg" : "border-primary/5 bg-white text-primary/60 hover:border-primary/20"
                    )}
                  >
                    <Globe size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Google Pay</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <Elements stripe={stripePromise}>
                  <StripeCheckoutForm amount={126.00} email={email} onSuccess={handleSuccess} />
                </Elements>
              ) : (
                <div className="p-8 bg-muted/20 rounded-[2rem] border-2 border-dashed border-primary/10 text-center space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    {paymentMethod === 'apple' ? <Smartphone className="text-primary" /> : <Globe className="text-primary" />}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    You will be redirected to {paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your purchase securely.
                  </p>
                  <Button onClick={handleSuccess} className="w-full h-16 text-lg font-black rounded-2xl shadow-xl shadow-primary/20">
                    Pay with {paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-2 shadow-xl rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="bg-muted/20 border-b p-6">
                <CardTitle className="text-lg font-black tracking-tight">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src="dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Beer Garden</h3>
                    <p className="text-xs text-muted-foreground font-medium">Oct 24, 2024 • 1 Ticket</p>
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">Seller: JazzLover99</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Ticket Price</span>
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

                <div className="pt-4 border-t space-y-3">
                  <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Receipt Email</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-12 rounded-xl border-2 font-bold"
                      required
                    />
                    <Button type="button" size="icon" className="rounded-xl h-12">
                      <Send size={20} />
                    </Button>
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

export default Checkout;