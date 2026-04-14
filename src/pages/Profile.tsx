"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle, ShieldCheck, CreditCard, Bell, LogOut, ChevronRight } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Profile = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center text-white shadow-2xl">
            <UserCircle size={48} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-primary tracking-tighter">Profile</h1>
            <p className="text-lg text-muted-foreground font-medium">Manage your account and payout preferences.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <nav className="space-y-2">
              {[
                { icon: UserCircle, label: 'General', active: true },
                { icon: CreditCard, label: 'Payouts', active: false },
                { icon: Bell, label: 'Notifications', active: false },
                { icon: ShieldCheck, label: 'Security', active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    item.active 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white text-primary/60 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  <ChevronRight size={14} className={item.active ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </nav>
            
            <Button variant="ghost" className="w-full justify-start gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-widest text-destructive hover:text-destructive hover:bg-destructive/5">
              <LogOut size={18} />
              Sign Out
            </Button>
          </div>

          <div className="md:col-span-2 space-y-8">
            <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 border-b bg-muted/10">
                <CardTitle className="text-2xl font-black tracking-tight">Account Information</CardTitle>
                <CardDescription className="font-medium">This information is kept private and never shared with other users.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">First Name</Label>
                      <Input id="firstName" defaultValue="Alex" className="h-12 rounded-xl border-2 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Last Name</Label>
                      <Input id="lastName" defaultValue="Rivers" className="h-12 rounded-xl border-2 font-bold" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input id="email" type="email" defaultValue="alex@example.com" className="h-12 rounded-xl border-2 font-bold" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 000-0000" className="h-12 rounded-xl border-2 font-bold" />
                  </div>

                  <Button type="submit" className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden bg-accent text-white">
              <CardContent className="p-8 flex items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                    <ShieldCheck size={24} />
                    Identity Verified
                  </h3>
                  <p className="text-sm font-medium opacity-80 leading-relaxed">
                    Your identity has been verified. This allows you to list tickets and receive payouts instantly.
                  </p>
                </div>
                <Badge className="bg-white text-accent px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shrink-0">
                  Verified
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;