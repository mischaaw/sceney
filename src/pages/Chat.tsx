"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Send, Shield, UserCircle, Lock, ShieldCheck, Smartphone, DollarSign, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Seller', text: "Hi! I saw you're interested in the Beer Garden tickets.", time: '10:30 AM', type: 'text' },
    { id: 2, sender: 'Buyer', text: 'Yes, are they still available? Would you take $40?', time: '10:32 AM', type: 'text' },
  ]);
  const [input, setInput] = useState('');
  const [isSeller] = useState(true); // Simulating seller view for demo

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: isSeller ? 'Seller' : 'Buyer',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      },
    ]);
    setInput('');
  };

  const makeOffer = () => {
    const price = prompt("Enter your offer price ($):");
    if (!price || isNaN(Number(price))) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'Seller',
        text: `OFFER: $${price}`,
        price: Number(price),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'offer',
        status: 'pending'
      },
    ]);
    showSuccess(`Offer of $${price} sent!`);
  };

  const handleAcceptOffer = (id: number, price: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'accepted' } : m));
    showSuccess("Offer accepted! Redirecting to checkout...");
    setTimeout(() => {
      navigate(`/checkout/offer-${id}?price=${price}`);
    }, 1500);
  };

  const handleDeclineOffer = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'declined' } : m));
    showSuccess("Offer declined.");
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
            <div className="flex items-center gap-3">
              {isSeller && (
                <Button 
                  onClick={makeOffer}
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full font-black text-[10px] uppercase tracking-widest h-10 px-4 gap-2"
                >
                  <DollarSign size={14} />
                  Make Offer
                </Button>
              )}
              <Badge variant="outline" className="text-white border-white/30 bg-white/10 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest hidden sm:flex">
                <Smartphone size={14} className="text-accent mr-2" />
                SMS Connected
              </Badge>
            </div>
          </div>

          {/* Escrow status */}
          <div className="px-8 py-4 bg-accent/5 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Escrow Protection</p>
                <p className="text-xs font-bold text-primary">Secure payment & instant transfer active</p>
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
                  className={`flex ${msg.sender === (isSeller ? 'Seller' : 'Buyer') ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%] space-y-2">
                    {msg.type === 'offer' ? (
                      <div className="bg-accent text-white p-6 rounded-[2rem] shadow-xl border-4 border-white">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <DollarSign size={24} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">New Offer Received</p>
                            <p className="text-3xl font-black tracking-tighter">${msg.price}</p>
                          </div>
                        </div>
                        
                        {msg.status === 'pending' ? (
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleAcceptOffer(msg.id, msg.price!)}
                              className="flex-1 bg-white text-accent hover:bg-white/90 font-black rounded-xl h-12"
                            >
                              <Check size={18} className="mr-2" />
                              Accept
                            </Button>
                            <Button 
                              onClick={() => handleDeclineOffer(msg.id)}
                              variant="outline" 
                              className="flex-1 border-white/30 text-white hover:bg-white/10 font-black rounded-xl h-12"
                            >
                              <X size={18} className="mr-2" />
                              Decline
                            </Button>
                          </div>
                        ) : (
                          <div className="bg-white/10 rounded-xl p-3 text-center">
                            <p className="text-xs font-black uppercase tracking-widest">
                              Offer {msg.status}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm ${
                          msg.sender === (isSeller ? 'Seller' : 'Buyer')
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-secondary/50 text-primary rounded-tl-none border border-primary/5'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}
                    <p
                      className={`text-[10px] font-bold text-muted-foreground uppercase tracking-tighter ${
                        msg.sender === (isSeller ? 'Seller' : 'Buyer') ? 'text-right' : 'text-left'
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
    </div>
  );
};

export default Chat;