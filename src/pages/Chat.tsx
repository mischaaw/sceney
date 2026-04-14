"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, Shield, UserCircle, Lock, ShieldCheck, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Seller', text: "Hi! I saw you're interested in the Beer Garden tickets.", time: '10:30 AM' },
    { id: 2, sender: 'Buyer', text: 'Yes, are they still available?', time: '10:32 AM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'Buyer',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col max-w-4xl">
        <div className="bg-white rounded-[2rem] shadow-2xl border-2 border-primary/5 flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-inner">
                <UserCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-black text-lg tracking-tight">Anonymous Seller #4821</h2>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">
                  Beer Garden • 2 Tickets
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-white border-white/30 bg-white/10 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
              <Smartphone size={14} className="text-accent" />
              SMS Connected
            </Badge>
          </div>

          {/* Escrow status */}
          <div className="px-8 py-4 bg-accent/5 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Escrow Status</p>
                <p className="text-xs font-bold text-primary">Payment Secured • Awaiting Transfer</p>
              </div>
            </div>
          </div>

          {/* Message list */}
          <ScrollArea className="flex-1 p-8">
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full">
                  <Lock size={12} className="text-muted-foreground" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    End-to-end encrypted & SMS Forwarded
                  </span>
                </div>
              </div>

              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'Buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex-1 min-w-0 space-y-2">
                    <div
                      className={`p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm ${
                        msg.sender === 'Buyer'
                          ? 'bg-primary text-primary-foreground rounded-tr-none'
                          : 'bg-secondary/50 text-primary rounded-tl-none border border-primary/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p
                      className={`text-[10px] font-bold text-muted-foreground uppercase tracking-tighter ${
                        msg.sender === 'Buyer' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input area */}
          <div className="p-6 border-t bg-muted/20">
            <div className="flex gap-3">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                className="rounded-2xl h-14 border-2 border-primary/10 focus-visible:ring-primary bg-white text-lg px-6"
              />
              <Button onClick={handleSend} className="rounded-2xl w-14 h-14 p-0 shadow-lg shadow-primary/20">
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;