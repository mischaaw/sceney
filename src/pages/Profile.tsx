"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UserCircle, ShieldCheck, CreditCard, Bell, LogOut, ChevronRight, Phone, Mail, Smartphone } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('General');
  
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
            <p className="text-lg text-muted-foreground font-medium">Manage your account and settings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <nav className="space-y-2">
              {[
                { icon: UserCircle, label: 'General' },
                { icon: CreditCard, label: 'Payouts' },
                { icon: Bell, label: 'Notifications' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    activeTab === item.label 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white text-primary/60 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  <ChevronRight size={14} className={activeTab === item.label ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </nav>
            
            <Button variant="ghost" className="w-full justify-start gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-widest text-destructive hover:text-destructive hover:bg-destructive/5">
              <LogOut size={18} />
              Sign Out
            </Button>
          </div>

          <div className="md:col-span-2 space-y-8">
            {activeTab === 'General' && (
              <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/10">
                  <CardTitle className="text-2xl font-black tracking-tight">Account Information</CardTitle>
                  <CardDescription className="font-medium">Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">First Name</Label>
                        <Input defaultValue="Alex" className="h-12 rounded-xl border-2 font-bold" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Last Name</Label>
                        <Input defaultValue="Rivers" className="h-12 rounded-xl border-2 font-bold" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Email Address</Label>
                      <Input defaultValue="alex@example.com" className="h-12 rounded-xl border-2 font-bold" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                      <Input defaultValue="+1 (555) 123-4567" className="h-12 rounded-xl border-2 font-bold" />
                    </div>
                    
                    <Button type="submit" className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === 'Payouts' && (
              <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/10">
                  <CardTitle className="text-2xl font-black tracking-tight">Payout Settings</CardTitle>
                  <CardDescription className="font-medium">Manage how you receive your earnings from ticket sales.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-green-50 rounded-2xl border-2 border-green-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                          <CreditCard size={24} />
                        </div>
                        <div>
                          <p className="font-black text-primary">Payment Method</p>
                          <p className="text-xs text-muted-foreground font-medium">•••• •••• •••• 4242</p>
                        </div>
                      </div>
                      <Button size="sm" className="rounded-full font-black text-[10px] uppercase tracking-widest px-4">Update</Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-black text-primary">Available Balance</p>
                          <p className="text-xs text-muted-foreground font-medium">Ready for withdrawal</p>
                        </div>
                        <p className="text-2xl font-black text-primary">$450.00</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-black text-primary">Pending Payouts</p>
                          <p className="text-xs text-muted-foreground font-medium">In escrow</p>
                        </div>
                        <p className="text-2xl font-black text-accent">$124.50</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t space-y-4">
                    <Button className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
                      Withdraw Funds
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Funds are available 24 hours after the event ends
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'Notifications' && (
              <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/10">
                  <CardTitle className="text-2xl font-black tracking-tight">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-black text-primary">SMS Notifications</p>
                      <p className="text-xs text-muted-foreground font-medium">Receive chat messages via text.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-black text-primary">Email Alerts</p>
                      <p className="text-xs text-muted-foreground font-medium">Get notified about sales and payouts.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-black text-primary">Marketing</p>
                      <p className="text-xs text-muted-foreground font-medium">New events and platform updates.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;