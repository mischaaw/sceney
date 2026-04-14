"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileCheck, UserCheck, AlertCircle, ChevronRight, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate();

  const verificationSteps = [
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Verify your legal identity to enable instant payouts and higher listing limits.',
      status: 'Verified',
      icon: UserCheck,
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      id: 'tickets',
      title: 'Ticket Authenticity',
      description: 'Our team manually reviews high-value ticket listings to ensure they are genuine.',
      status: 'Pending',
      icon: FileCheck,
      color: 'text-accent',
      bg: 'bg-accent/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <Badge className="mb-4 bg-accent text-white border-none px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
            Trust & Safety
          </Badge>
          <h1 className="text-5xl font-black text-primary tracking-tighter">Verification <span className="text-accent italic">Center</span></h1>
          <p className="text-lg text-muted-foreground font-medium mt-2">Ensuring a secure marketplace for every scene.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {verificationSteps.map((step) => (
            <Card key={step.id} className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-colors">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-3xl ${step.bg} flex items-center justify-center ${step.color}`}>
                    <step.icon size={40} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-primary tracking-tight">{step.title}</h3>
                      <Badge className={`${step.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-accent/10 text-accent'} border-none px-3 py-0.5 rounded-full font-black text-[10px] uppercase tracking-widest`}>
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground font-medium leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-2xl px-8 h-14 font-black border-2 gap-2 group">
                  {step.status === 'Verified' ? 'View Details' : 'Complete Now'}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card className="border-2 border-dashed border-primary/10 bg-white/50 rounded-[2.5rem] p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto">
              <UploadCloud size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-primary tracking-tight">Have a ticket to verify?</h3>
              <p className="text-muted-foreground font-medium max-w-sm mx-auto">
                Upload your digital ticket or proof of purchase to get the "Verified" badge on your listing.
              </p>
            </div>
            <Button onClick={() => navigate('/sell')} className="rounded-full px-10 h-14 font-black shadow-xl shadow-primary/20">
              Start New Listing
            </Button>
          </Card>

          <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex items-start gap-6">
            <div className="bg-accent p-3 rounded-2xl shrink-0">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-lg tracking-tight">Why Verification Matters</h4>
              <p className="text-sm opacity-80 leading-relaxed">
                Verified users are 4x more likely to sell their tickets. Our verification process protects both parties by ensuring that sellers are real people and tickets are valid for entry.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Verification;