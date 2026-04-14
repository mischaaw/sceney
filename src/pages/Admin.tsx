"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { ShieldAlert, Eye, CheckCircle2, Clock, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Admin = () => {
  const transactions = [
    { id: 'TX-901', buyer: 'User_88', seller: 'User_12', amount: 126.00, commission: 6.00, status: 'Escrow' },
    { id: 'TX-902', buyer: 'User_45', seller: 'User_09', amount: 472.50, commission: 22.50, status: 'Completed' },
    { id: 'TX-903', buyer: 'User_21', seller: 'User_33', amount: 89.25, commission: 4.25, status: 'Pending Verification' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge className="mb-4 bg-accent text-white border-none px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
              System Administrator
            </Badge>
            <h1 className="text-5xl font-black text-primary tracking-tighter flex items-center gap-4">
              Monitor <span className="text-accent italic">Center</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-2 font-medium">Overseeing platform integrity and transaction security.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2 shadow-lg bg-primary text-primary-foreground min-w-[160px]">
              <CardContent className="p-4">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Total Fees</p>
                <p className="text-2xl font-black">$1,240.50</p>
              </CardContent>
            </Card>
            <Card className="border-2 shadow-lg bg-white min-w-[160px]">
              <CardContent className="p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Active Escrows</p>
                <p className="text-2xl font-black text-primary">14</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white rounded-[2rem] shadow-xl border-2 border-primary/5 overflow-hidden">
              <div className="p-8 border-b bg-muted/10 flex items-center justify-between">
                <h2 className="font-black text-xl tracking-tight flex items-center gap-3">
                  <TrendingUp className="text-accent" size={24} />
                  Recent Transactions
                </h2>
                <Button variant="outline" size="sm" className="rounded-full font-bold text-xs border-2">View All</Button>
              </div>
              <Table>
                <TableHeader className="bg-muted/5">
                  <TableRow className="hover:bg-transparent border-b-2">
                    <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 px-8">ID</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Parties</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Total</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px]">5% Fee</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/5 transition-colors">
                      <TableCell className="font-mono text-xs font-bold px-8 py-6">{tx.id}</TableCell>
                      <TableCell>
                        <div className="text-xs font-bold space-y-1">
                          <p className="flex items-center gap-1"><span className="text-muted-foreground w-4">B:</span> {tx.buyer}</p>
                          <p className="flex items-center gap-1"><span className="text-muted-foreground w-4">S:</span> {tx.seller}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-primary">${tx.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-accent font-black">${tx.commission.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={tx.status === 'Completed' ? 'default' : 'outline'} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                          {tx.status === 'Escrow' && <Clock size={10} className="mr-1.5" />}
                          {tx.status === 'Completed' && <CheckCircle2 size={10} className="mr-1.5" />}
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Button variant="ghost" size="sm" className="rounded-full font-bold text-xs hover:bg-primary hover:text-white">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </div>

          <div className="space-y-10">
            <section className="bg-white rounded-[2rem] shadow-xl border-2 border-primary/5 overflow-hidden">
              <div className="p-8 border-b bg-muted/10 flex items-center justify-between">
                <h2 className="font-black text-xl tracking-tight flex items-center gap-3">
                  <MessageSquare className="text-accent" size={24} />
                  Active Chats
                </h2>
                <Badge className="bg-primary text-white rounded-full px-2 py-0.5 text-[10px]">3</Badge>
              </div>
              <div className="divide-y-2 divide-muted/10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 hover:bg-muted/5 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Chat #882{i}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">2m ago</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground line-clamp-2 leading-relaxed">
                      "I can transfer them via the official app once the payment is confirmed..."
                    </p>
                    <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <Button size="sm" variant="outline" className="h-8 text-[10px] font-black uppercase tracking-widest gap-2 rounded-full border-2">
                        <Eye size={14} /> Monitor Conversation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Card className="border-2 shadow-xl bg-accent text-white rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                  <ShieldAlert size={20} />
                  Security Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium opacity-90 leading-relaxed">
                  No suspicious activity detected in the last 24 hours. All escrow holds are verified.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;