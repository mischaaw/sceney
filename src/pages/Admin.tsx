"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { ShieldAlert, Eye, CheckCircle2, Clock } from 'lucide-react';
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <ShieldAlert className="text-accent" />
              Admin Monitor
            </h1>
            <p className="text-muted-foreground">Overseeing all platform activity and escrow holds.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border text-center min-w-[120px]">
              <p className="text-xs text-muted-foreground uppercase font-bold">Total Fees</p>
              <p className="text-2xl font-bold text-primary">$1,240.50</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b bg-muted/20">
                <h2 className="font-bold text-lg">Recent Transactions</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Parties</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>5% Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <p><span className="text-muted-foreground">B:</span> {tx.buyer}</p>
                          <p><span className="text-muted-foreground">S:</span> {tx.seller}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">${tx.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-accent font-medium">${tx.commission.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={tx.status === 'Completed' ? 'default' : 'outline'} className="text-[10px]">
                          {tx.status === 'Escrow' && <Clock size={10} className="mr-1" />}
                          {tx.status === 'Completed' && <CheckCircle2 size={10} className="mr-1" />}
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b bg-muted/20">
                <h2 className="font-bold text-lg">Active Chats</h2>
              </div>
              <div className="divide-y">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 hover:bg-muted/10 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-primary">Chat #882{i}</span>
                      <span className="text-[10px] text-muted-foreground">2m ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      "I can transfer them via the official app once..."
                    </p>
                    <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" className="h-7 text-[10px] gap-1">
                        <Eye size={12} /> Monitor
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;