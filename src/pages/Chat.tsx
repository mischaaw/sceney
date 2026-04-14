"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Send, Shield, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Seller', text: "Hi! I saw you're interested in the Jazz Festival tickets.", time: '10:30 AM' },
    { id: 2, sender: 'Buyer', text: "Yes, are they still available? And are they digital or physical?", time: '10:32 AM' },
    { id: 3, sender: 'Seller', text: "They are digital. I can transfer them via the official app once the payment is confirmed by Sceney.", time: '10:33 AM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      sender: 'Buyer',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl border flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <UserCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold">Anonymous Seller #4821</h2>
                <p className="text-xs opacity-80">Midnight Jazz Festival • 2 Tickets</p>
              </div>
            </div>
            <Badge variant="outline" className="text-white border-white/30 flex gap-1 items-center">
              <Shield size={12} />
              Monitored
            </Badge>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  Conversation started Oct 20, 2024
                </span>
              </div>
              
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'Buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] space-y-1`}>
                    <div className={`p-4 rounded-2xl text-sm ${
                      msg.sender === 'Buyer' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-muted text-foreground rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <p className={`text-[10px] text-muted-foreground ${msg.sender === 'Buyer' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-muted/30">
            <div className="flex gap-2">
              <Input 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="rounded-full border-2 focus-visible:ring-primary"
              />
              <Button onClick={handleSend} className="rounded-full w-12 h-12 p-0">
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-[10px] text-center mt-3 text-muted-foreground">
              For your safety, never share personal contact info or pay outside of Sceney.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;