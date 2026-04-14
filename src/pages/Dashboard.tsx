"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarRating from '@/components/StarRating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Ticket, 
  ShoppingBag, 
  Clock, 
  MessageSquare, 
  DollarSign, 
  AlertCircle,
  Banknote,
  ExternalLink,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const [userRating, setUserRating] = useState(0);

  const stats = {
    totalSales: 1240.50,
    activeListings: 1,
    pendingPayouts: 450.00,
    totalPurchases: 1
  };

  const purchases = [
    {
      id: '1',
      event: 'Old City Beer Garden',
      date: 'Oct 24, 2024',
      status: 'In Escrow',
      price: 126.00,
      seller: 'User_4821',
      image: '/src/assets/beer-garden-sign.png',
      rated: false
    }
  ];

  const listings = [
    {
      id: '1',
      event: 'Old City Beer Garden',
      date: 'Nov 12, 2024',
      status: 'Active',
      price: 450.00,
      views: 124,
      image: '/src/assets/beer-garden-sign.png'
    }
  ];

  const handleRateSeller = (purchase: any) => {
    setSelectedPurchase(purchase);
    setIsRatingOpen(true);
  };

  const submitRating = () => {
    showSuccess(`Rating of ${userRating} stars submitted for ${selectedPurchase.seller}!`);
    setIsRatingOpen(false);
    setUserRating(0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-primary tracking-tighter">
              My <span className="text-accent italic">Dashboard</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-2 font-medium">Manage your sales, purchases, and earnings.</p>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={() => navigate('/sell')} className="rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20">
              List New Ticket
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-2 shadow-xl rounded-[2rem] bg-primary text-primary-foreground overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/10 rounded-xl">
                  <DollarSign size={20} className="text-accent" />
                </div>
                <Badge className="bg-accent text-white border-none px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">Total Sales</Badge>
              </div>
              <p className="text-3xl font-black tracking-tighter">${stats.totalSales.toFixed(2)}</p>
              <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1">Lifetime Sales</p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl rounded-[2rem] bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/5 rounded-xl">
                  <Ticket size={20} className="text-primary" />
                </div>
                <Badge variant="outline" className="border-2 text-[9px] font-black uppercase tracking-widest">Active</Badge>
              </div>
              <p className="text-3xl font-black tracking-tighter text-primary">{stats.activeListings}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Tickets for Sale</p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl rounded-[2rem] bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-accent/10 rounded-xl">
                  <Clock size={20} className="text-accent" />
                </div>
                <Badge className="bg-accent/10 text-accent border-none text-[9px] font-black uppercase tracking-widest">Pending</Badge>
              </div>
              <p className="text-3xl font-black tracking-tighter text-primary">${stats.pendingPayouts.toFixed(2)}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">In Escrow</p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl rounded-[2rem] bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-50 rounded-xl">
                  <ShoppingBag size={20} className="text-green-600" />
                </div>
                <Badge className="bg-green-50 text-green-700 border-none text-[9px] font-black uppercase tracking-widest">Purchased</Badge>
              </div>
              <p className="text-3xl font-black tracking-tighter text-primary">{stats.totalPurchases}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total Purchases</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="selling" className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-primary/5 pb-4">
            <TabsList className="bg-muted/50 p-1 rounded-2xl border-2 border-primary/5">
              <TabsTrigger value="selling" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                Selling
              </TabsTrigger>
              <TabsTrigger value="buying" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                Buying
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="selling" className="space-y-6">
            {listings.map((item) => (
              <Card key={item.id} className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-all group">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/5">
                      <img src={item.image} alt={item.event} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-black text-primary tracking-tight">{item.event}</h3>
                        <Badge variant={item.status === 'Active' ? 'default' : 'secondary'} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} />
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center md:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Price</p>
                      <p className="text-2xl font-black text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="rounded-xl border-2 font-bold h-12 px-6" onClick={() => navigate(`/ticket/${item.id}`)}>View Ticket</Button>
                      <Button className="rounded-xl font-bold h-12 px-6 shadow-lg shadow-primary/10">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="buying" className="space-y-6">
            {purchases.map((item) => (
              <Card key={item.id} className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-all group">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/5">
                      <img src={item.image} alt={item.event} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-black text-primary tracking-tight">{item.event}</h3>
                        <Badge className="bg-accent text-white border-none text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} />
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center md:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Paid</p>
                      <p className="text-2xl font-black text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="rounded-xl border-2 font-black h-12 px-6 gap-2 text-accent hover:bg-accent hover:text-white"
                        onClick={() => handleRateSeller(item)}
                      >
                        <Star size={16} />
                        Rate Seller
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-xl border-2 w-12 h-12" onClick={() => navigate('/messages/chat')}>
                        <MessageSquare size={20} />
                      </Button>
                      <Button variant="outline" className="rounded-xl border-2 font-bold h-12 px-6 gap-2" onClick={() => navigate(`/ticket/${item.id}`)}>
                        View Ticket
                        <ExternalLink size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Dialog open={isRatingOpen} onOpenChange={setIsRatingOpen}>
          <DialogContent className="rounded-[2.5rem] border-2 p-8 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tight">Rate your experience</DialogTitle>
              <DialogDescription className="font-medium">
                How was your transaction with <span className="text-primary font-bold">{selectedPurchase?.seller}</span>?
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-10 flex flex-col items-center gap-6">
              <StarRating 
                rating={userRating} 
                onRate={setUserRating} 
                interactive 
                size={48} 
              />
              <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                {userRating === 0 ? "Select a rating" : 
                 userRating === 1 ? "Terrible" : 
                 userRating === 2 ? "Poor" : 
                 userRating === 3 ? "Average" : 
                 userRating === 4 ? "Great" : "Excellent!"}
              </p>
            </div>

            <DialogFooter className="gap-3">
              <Button variant="outline" onClick={() => setIsRatingOpen(false)} className="rounded-xl font-bold">Cancel</Button>
              <Button 
                onClick={submitRating} 
                disabled={userRating === 0}
                className="rounded-xl font-black px-8 shadow-lg shadow-primary/20"
              >
                Submit Rating
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mt-16 bg-accent/5 border-2 border-dashed border-accent/20 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-accent/20">
            <AlertCircle size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-black text-primary tracking-tight mb-2">Escrow Protection Active</h4>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Your funds and tickets are secured by Sceney's escrow system. Payouts are released 24 hours after the event ends to ensure a successful experience for both parties.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;