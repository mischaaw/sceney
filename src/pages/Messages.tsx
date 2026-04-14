"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { MessageSquare, UserCircle, Shield, ChevronRight, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Messages = () => {
  const navigate = useNavigate();
  
  const chats = [
    {
      id: 1,
      user: 'Anonymous Seller #4821',
      event: 'Midnight Jazz Festival',
      lastMessage: 'They are digital. I can transfer them via the official app...',
      time: '2m ago',
      unread: true,
      status: 'Active'
    },
    {
      id: 2,
      user: 'Anonymous Buyer #9912',
      event: 'Tech Vision Summit 2024',
      lastMessage: 'Is the price negotiable for 3 tickets?',
      time: '1h ago',
      unread: false,
      status: 'Pending'
    },
    {
      id: 3,
      user: 'Anonymous Seller #1023',
      event: 'Championship Finals',
      lastMessage: 'Payment confirmed. Transferring now.',
      time: 'Yesterday',
      unread: false,
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-5xl font-black text-primary tracking-tighter">Inbox</h1>
            <p className="text-lg text-muted-foreground font-medium mt-2">Your anonymous conversations.</p>
          </div>
          <Badge className="bg-accent text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
            {chats.filter(c => c.unread).length} New Messages
          </Badge>
        </div>

        <div className="space-y-4">
          {chats.map((chat) => (
            <Card 
              key={chat.id} 
              className={`border-2 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 rounded-[2rem] overflow-hidden ${
                chat.unread ? 'border-primary shadow-lg' : 'border-primary/5'
              }`}
              onClick={() => navigate('/messages/chat')}
            >
              <CardContent className="p-6 flex items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                    <UserCircle className="text-primary" size={32} />
                  </div>
                  {chat.unread && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-primary tracking-tight truncate">{chat.user}</h3>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                      <Clock size={12} />
                      {chat.time}
                    </span>
                  </div>
                  <p className="text-xs font-black text-accent uppercase tracking-widest mb-2">{chat.event}</p>
                  <p className="text-sm text-muted-foreground font-medium truncate leading-relaxed">
                    {chat.lastMessage}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2">
                    {chat.status}
                  </Badge>
                  <ChevronRight className="text-muted-foreground" size={20} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white/50 p-8 rounded-[2.5rem] border-2 border-dashed border-primary/10 flex flex-col items-center text-center space-y-4">
          <Shield className="text-accent" size={32} />
          <div>
            <h4 className="font-black text-primary tracking-tight">Sceney Protection Active</h4>
            <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto mt-2">
              All conversations are monitored for your safety. Never share personal contact information or payment details in chat.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;