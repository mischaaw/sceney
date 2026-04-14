"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, ShoppingBag, Clock, CheckCircle2, ExternalLink, MessageSquare, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const purchases = [
    {
      id: '1',
      event: 'Midnight Jazz Festival',
      date: 'Oct 24, 2024',
      status: 'In Escrow',
      subStatus: 'Awaiting Transfer',
      price: 126.00,
      seller: 'User_4821'
    }
  ];

  const listings = [
    {
      id: '101',
      event: 'Tech Vision Summit 2024',
      date: 'Nov 12, 2024',
      status: 'Active',
      price: 450.00,
      views: 124
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-primary tracking-tighter">
              My <span className="text-accent italic">Activity</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-2 font-medium">Manage your tickets and secure transactions.</p>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={() => navigate('/sell')} className="rounded-full px-8 font-bold shadow-lg shadow-primary/20">
              List New Ticket
            </Button>
          </div>
        </div>

        <Tabs defaultValue="buying" className="space-y-8">
          <TabsList className="bg-muted/50 p-1 rounded-2xl border-2 border-primary/5">
            <TabsTrigger value="buying" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              Buying
            </TabsTrigger>
            <TabsTrigger value="selling" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
              Selling
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buying" className="space-y-6">
            {purchases.length > 0 ? (
              purchases.map((item) => (
                <Card key={item.id} className="border-2 shadow-xl rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                        <ShoppingBag size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-primary tracking-tight">{item.event}</h3>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{item.date}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Escrow Status</p>
                        <div className="flex flex-col items-center md:items-end gap-1">
                          <Badge className="bg-accent text-white px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <Clock size={12} />
                            {item.status}
                          </Badge>
                          <span className="text-[9px] font-black text-accent uppercase tracking-tighter">{item.subStatus}</span>
                        </div>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Paid</p>
                        <p className="text-xl font-black text-primary">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-xl border-2" onClick={() => navigate('/messages/chat')}>
                          <MessageSquare size={18} />
                        </Button>
                        <Button variant="outline" className="rounded-xl border-2 font-bold gap-2">
                          View Receipt
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <div className="bg-muted/20 px-8 py-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-accent" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Funds secured in Sceney Escrow</span>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest text-accent" onClick={() => navigate('/messages/chat')}>
                      Confirm Receipt of Ticket
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-primary/10">
                <ShoppingBag className="mx-auto text-muted-foreground mb-4" size={48} />
                <h3 className="text-xl font-black text-primary">No active purchases</h3>
                <p className="text-muted-foreground mt-2">Tickets you buy will appear here during the escrow process.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="selling" className="space-y-6">
            {listings.map((item) => (
              <Card key={item.id} className="border-2 shadow-xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                      <Ticket size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-primary tracking-tight">{item.event}</h3>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="text-center md:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                      <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={12} />
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Asking Price</p>
                      <p className="text-xl font-black text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="rounded-xl border-2 font-bold">Edit Listing</Button>
                      <Button className="rounded-xl font-bold">Promote</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <section className="mt-20 bg-primary text-primary-foreground rounded-[3rem] p-12 overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black tracking-tighter mb-4">How Sceney Protects You</h2>
            <p className="text-lg opacity-80 leading-relaxed mb-8">
              Whether you're buying or selling, our escrow system ensures that money only changes hands when the ticket is successfully used.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-black uppercase tracking-widest text-xs text-accent">For Buyers</h4>
                <p className="text-sm opacity-70">Your payment is held until you confirm entry or 24h after the event.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase tracking-widest text-xs text-accent">For Sellers</h4>
                <p className="text-sm opacity-70">We verify the buyer has the funds before you ever transfer the ticket.</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2" />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;