"use client";

import React from 'react';
import { Bell, Check, Clock, Info, Zap, Smartphone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Price Drop Alert!",
    description: "Beer Garden tickets just dropped to $40.",
    time: "2m ago",
    type: "price",
    unread: true
  },
  {
    id: 2,
    title: "New Message",
    description: "Anonymous Seller #4821 sent you a message.",
    time: "15m ago",
    type: "message",
    unread: true
  },
  {
    id: 3,
    title: "Verification Success",
    description: "Your identity has been successfully verified.",
    time: "1h ago",
    type: "system",
    unread: false
  }
];

const NotificationsDropdown = () => {
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/5">
          <Bell className="w-5 h-5 text-primary/60" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-[2rem] p-4 border-2 shadow-2xl">
        <DropdownMenuLabel className="flex items-center justify-between px-2 py-2">
          <span className="font-black text-xs uppercase tracking-widest">Notifications</span>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 text-white text-[8px] font-black px-2 py-0 rounded-full flex items-center gap-1">
              <Smartphone size={10} /> SMS ACTIVE
            </Badge>
            {unreadCount > 0 && (
              <Badge className="bg-accent text-white text-[10px] font-black px-2 py-0 rounded-full">
                {unreadCount} New
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <div className="space-y-1">
          {NOTIFICATIONS.map((n) => (
            <DropdownMenuItem 
              key={n.id} 
              className={cn(
                "flex items-start gap-4 p-3 rounded-2xl cursor-pointer transition-colors",
                n.unread ? "bg-primary/5" : "hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                n.type === 'price' ? "bg-accent/10 text-accent" : 
                n.type === 'message' ? "bg-primary/10 text-primary" : "bg-green-100 text-green-600"
              )}>
                {n.type === 'price' ? <Zap size={18} /> : 
                 n.type === 'message' ? <Clock size={18} /> : <Check size={18} />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs font-black text-primary leading-none">{n.title}</p>
                <p className="text-[11px] text-muted-foreground font-medium leading-tight">{n.description}</p>
                <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tighter">{n.time}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="justify-center py-2 rounded-xl focus:bg-primary focus:text-white transition-colors">
          <span className="text-[10px] font-black uppercase tracking-widest">View All Activity</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;