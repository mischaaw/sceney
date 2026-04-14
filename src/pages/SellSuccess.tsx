"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ShieldCheck, ArrowRight, LayoutDashboard } from 'lucide-react';

const SellSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <Card className="max-w-2xl w-full border-2 shadow-2xl rounded-[3rem] overflow-hidden">
          <CardContent className="p-12 text-center space-y-8">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={56} />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-black text-primary tracking-tighter">Listing Submitted!</h1>
              <p className="text-xl text-muted-foreground font-medium max-w-md mx-auto">
                Your tickets are now being verified by our team. This usually takes less than 30 minutes.
              </p>
            </div>

            <div className="bg-muted/30 p-8 rounded-[2rem] text-left space-y-6 border-2 border-primary/5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <ShieldCheck className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-black text-primary tracking-tight">Verification in Progress</h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    We're checking the authenticity of your upload. You'll receive a notification once it's live.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <LayoutDashboard className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-black text-primary tracking-tight">Track in Dashboard</h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    You can manage your listing, view stats, and chat with potential buyers from your dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outline"
                className="flex-1 h-16 rounded-2xl font-black text-lg border-2 gap-2"
                onClick={() => navigate('/')}
              >
                Back to Marketplace
                <ArrowRight size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SellSuccess;