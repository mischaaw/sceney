"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Zap, Lock, MessageSquare, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HowItWorks = () => {
  const steps = [
    {
      icon: ShieldCheck,
      title: "Verified Events Only",
      description: "Only authorized developers can create events. This ensures every listing is for a real, upcoming scene."
    },
    {
      icon: Phone,
      title: "Secure Verification",
      description: "All users must verify their phone and email. This connects our anonymous chat directly to your SMS for instant updates."
    },
    {
      icon: Lock,
      title: "Escrow Protection",
      description: "Payments are held securely by Sceney. Sellers only get paid after the buyer successfully enters the event."
    },
    {
      icon: MessageSquare,
      title: "SMS‑Linked Chat",
      description: "Chat anonymously with buyers/sellers. Messages are forwarded to your phone so you never miss a beat."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-20 max-w-5xl flex-1">
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-accent text-white border-none px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
            The Sceney Standard
          </Badge>
          <h1 className="text-6xl font-black text-primary tracking-tighter mb-6">
            How it <span className="text-accent italic">works.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            We've built the most secure marketplace for fans, by fans. No scams, no stress, just scenes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-all">
              <CardContent className="p-10 flex gap-6">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-accent shrink-0">
                  <step.icon size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-primary tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary text-white rounded-[3rem] p-12 md:p-20 text-center space-y-8">
          <h2 className="text-4xl font-black tracking-tighter">Ready to join the scene?</h2>
          <p className="text-lg opacity-80 max-w-xl mx-auto font-medium">
           Verify your account today to start buying and selling with total peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/10 text-white border-white/20 px-6 py-2 rounded-full font-bold">
              <Mail className="mr-2 w-4 h-4" /> Email Verified
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 px-6 py-2 rounded-full font-bold">
              <Phone className="mr-2 w-4 h-4" /> SMS Connected
            </Badge>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;