"use client";

import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TicketProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
}

const TicketCard = ({ ticket }: { ticket: TicketProps }) => {
  const commission = ticket.price * 0.05;
  const totalPrice = ticket.price + commission;

  return (
    <div className="group">
      <Card className="overflow-hidden border-2 shadow-lg bg-white transition-all hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={ticket.image} 
            alt={ticket.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-4 right-4 bg-primary/90 text-white border-none">
            {ticket.category}
          </Badge>
        </div>
        <CardHeader className="p-5 pb-2">
          <h3 className="text-xl font-black leading-tight text-primary">{ticket.title}</h3>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar size={16} className="text-accent" />
            <span>{ticket.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin size={16} className="text-accent" />
            <span>{ticket.location}</span>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex items-center justify-between border-t mt-2 bg-muted/5">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Total Price</p>
            <p className="text-xl font-black text-primary">${totalPrice.toFixed(2)}</p>
          </div>
          <Button size="sm" className="rounded-full font-bold">
            Details
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketCard;