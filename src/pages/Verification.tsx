"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheck, 
  FileCheck, 
  UserCheck, 
  ChevronRight, 
  UploadCloud, 
  Smartphone, 
  Mail, 
  Lock,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Verification = () => {
  const navigate = useNavigate();
  const [verifyingStep, setVerifyingStep] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [verifiedSteps, setVerifiedSteps] = useState<string[]>(['identity']);

  const handleStartVerification = (stepId: string) => {
    setVerifyingStep(stepId);
    setCode("");
    showSuccess(`Verification code sent to your ${stepId === 'email' ? 'email' : 'phone'}!`);
  };

  const handleVerifyCode = () => {
    if (code === "123456") {
      setVerifiedSteps(prev => [...prev, verifyingStep!]);
      showSuccess(`${verifyingStep === 'email' ? 'Email' : 'Phone'} verified successfully!`);
      setVerifyingStep(null);
    } else {
      showError("Invalid verification code. Try 123456.");
    }
  };

  const verificationSteps = [
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Verify your legal identity to enable instant payouts and higher listing limits.',
      icon: UserCheck,
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      id: 'phone',
      title: 'Phone & SMS',
      description: 'Connect your phone number to receive instant chat notifications and secure your account.',
      icon: Smartphone,
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    {
      id: 'email',
      title: 'Email Address',
      description: 'Verify your primary email to receive receipts and important platform updates.',
      icon: Mail,
      color: 'text-primary',
      bg: 'bg-primary/5'
    }
  ];

  if (verifyingStep) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-20 max-w-md flex-1 flex flex-col items-center justify-center">
          <Card className="w-full border-2 shadow-2xl rounded-[3rem] p-10 text-center space-y-8">
            <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mx-auto">
              {verifyingStep === 'email' ? <Mail size={40} /> : <Smartphone size={40} />}
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-primary tracking-tight">Enter Code</h2>
              <p className="text-sm text-muted-foreground font-medium">
                We've sent a 6-digit code to your {verifyingStep}.
              </p>
            </div>

            <div className="flex justify-center">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="w-12 h-14 text-xl font-black border-2 rounded-xl" />
                  <InputOTPSlot index={1} className="w-12 h-14 text-xl font-black border-2 rounded-xl" />
                  <InputOTPSlot index={2} className="w-12 h-14 text-xl font-black border-2 rounded-xl" />
                  <InputOTPSlot index={3} className="w-12 h-14 text-xl font-black border-2 rounded-xl" />
                  <InputOTPSlot index={4} className="w-12 h-14 text-xl font-black border-2 rounded-xl" />
                  <InputOTPSlot index={5} className="w-12 h-14 text-xl font-black border-2 rounded-xl" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleVerifyCode}
                disabled={code.length !== 6}
                className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
              >
                Verify Now
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setVerifyingStep(null)}
                className="w-full font-bold text-muted-foreground gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="mb-12">
          <Badge className="mb-4 bg-accent text-white border-none px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
            Trust & Safety
          </Badge>
          <h1 className="text-5xl font-black text-primary tracking-tighter">Verification <span className="text-accent italic">Center</span></h1>
          <p className="text-lg text-muted-foreground font-medium mt-2">Ensuring a secure marketplace for every scene.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {verificationSteps.map((step) => {
            const isVerified = verifiedSteps.includes(step.id);
            return (
              <Card key={step.id} className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-colors">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-3xl ${isVerified ? 'bg-green-50 text-green-500' : step.bg} flex items-center justify-center ${isVerified ? 'text-green-500' : step.color}`}>
                      <step.icon size={40} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-black text-primary tracking-tight">{step.title}</h3>
                        <Badge className={`${isVerified ? 'bg-green-100 text-green-700' : 'bg-accent/10 text-accent'} border-none px-3 py-0.5 rounded-full font-black text-[10px] uppercase tracking-widest`}>
                          {isVerified ? 'Verified' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground font-medium leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant={isVerified ? "outline" : "default"}
                    onClick={() => !isVerified && handleStartVerification(step.id)}
                    className="rounded-2xl px-8 h-14 font-black border-2 gap-2 group"
                  >
                    {isVerified ? 'View Details' : 'Complete Now'}
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-dashed border-primary/10 bg-white/50 rounded-[2.5rem] p-10 text-center space-y-6">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto">
                <UploadCloud size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-primary tracking-tight">Verify a Ticket</h3>
                <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">
                  Upload your digital ticket or proof of purchase to get the "Verified" badge.
                </p>
              </div>
              <Button onClick={() => navigate('/sell')} className="w-full rounded-full h-14 font-black shadow-xl shadow-primary/20">
                Start New Listing
              </Button>
            </Card>

            <Card className="border-2 border-primary/5 bg-primary text-white rounded-[2.5rem] p-10 space-y-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent mx-auto">
                <Lock size={32} />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-black tracking-tight">Escrow Protection</h3>
                <p className="text-sm opacity-80 font-medium max-w-xs mx-auto">
                  Your funds are held securely until 24 hours after the event ends.
                </p>
              </div>
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>Buyer protection guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>Seller payout security</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Verification;