"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Ticket, 
  ShoppingBag, 
  Clock, 
  CheckCircle2,   ExternalLink, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  ChevronRight,
  LineChart,
  TrendingDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [priceData, setPriceData] = useState<any[]>([]);

  useEffect(() => {
    // Mock price data for chart    const mockData = [
      { date: 'Jan', low: 40, high: 65 },
      { date: 'Feb', low: 42, high: 70 },
      { date: 'Mar', low: 38, high: 68 },
      { date: 'Apr', low: 45, high: 75 },
      { date: 'May', low: 48, high: 80 },
      { date: 'Jun', low: 52, high: 85 },
    ];
    setPriceData(mockData);
  }, []);

  // Mock data for the dashboard  const stats = {
    totalSales: 1240.50,
    activeListings: 3,
    pendingPayouts: 450.00,
    totalPurchases: 1
  };

  const purchases = [
    {
      id: 'PUR-901',
      event: 'Beer Garden',
      date: 'Oct 24, 2024',
      status: 'In Escrow',
      price: 126.00,
      seller: 'User_4821',
      image: 'dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png'
    }
  ];

  const listings = [
    {
      id: 'LST-101',
      event: 'Beer Garden',
      date: 'Nov 12, 2024',
      status: 'Active',
      price: 450.00,
      views: 124,
      image: 'dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png'
    },
    {
      id: 'LST-102',
      event: 'Tech Vision Summit',
      date: 'Dec 05, 2024',
      status: 'Sold',
      price: 299.00,
      views: 89,
      image: 'https://images.unsplash.com/photo-1540575861501-7338eba7524a?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
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

        {/* Stats Overview */}
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
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 -mb-4 -mr-4 rounded-full" />
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

        {/* Price Tracking Chart */}
        <Card className="border-2 shadow-xl rounded-[2rem] overflow-hidden mb-12">
          <CardHeader className="p-8 border-b bg-muted/10">
            <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
              <LineChart className="text-accent" size={24} />
              Price Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '1rem' }}
                    labelStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="high" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: 'hsl(var(--accent))' }} />
                  <Line type="monotone" dataKey="low" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))' }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent rounded-full"></div>
                <span className="text-sm font-bold text-primary">High Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="text-sm font-bold text-primary">Low Price</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="selling" className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-primary/5 pb-4">
            <TabsList className="bg-muted/50 p-1 rounded-2xl border-2 border-primary/5">
              <TabsTrigger value="selling" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                Selling              </TabsTrigger>
              <TabsTrigger value="buying" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                Buying
              </TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <TrendingUp size={14} className="text-accent" />
              Market activity is high today
            </div>
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
                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest">{item.views} Views</span>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">ID: {item.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center md:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Price</p>
                      <p className="text-2xl font-black text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="rounded-xl border-2 font-bold h-12 px-6">Edit</Button>
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
                      <p className="mt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Seller: {item.seller}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center md:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Paid</p>
                      <p className="text-2xl font-black text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-xl border-2 w-12 h-12" onClick={() => navigate('/messages/chat')}>
                        <MessageSquare size={20} />
                      </Button>
                      <Button variant="outline" className="rounded-xl border-2 font-bold h-12 px-6 gap-2">
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

        {/* Security Notice */}
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
          <Button variant="link" className="font-black text-accent uppercase tracking-widest text-xs gap-2 group">
            Learn More
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;