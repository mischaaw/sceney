"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface TicketProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
  likes?: number;
}

const TicketCard = ({ ticket }: { ticket: TicketProps }) => {
  const navigate = useNavigate();
  const likeCount = ticket.likes ?? 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/ticket/${ticket.id}`)}
      className="cursor-pointer group"
    >
      <Card className="overflow-hidden border-2 shadow-lg bg-white rounded-[2.5rem] h-full flex flex-col transition-all hover:border-primary/20 hover:shadow-2xl">
        <div className="relative h-64 overflow-hidden bg-black">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <Badge className="absolute top-6 right-6 bg-primary text-white border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
            {ticket.category}
          </Badge>
        </div>

        <CardContent className="p-8 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-3xl font-black leading-none text-primary tracking-tighter">{ticket.title}</h3>
              <div className="flex items-center gap-1.5 bg-red-50 text-red-500 px-3 py-1 rounded-full">
                <Heart size={14} fill="currentColor" />
                <span className="text-[10px] font-black">{likeCount}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <Calendar size={16} className="text-accent" />
                <span>{ticket.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <MapPin size={16} className="text-accent" />
                <span>{ticket.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-primary/5 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-1">Starting From</p>
              <p className="text-4xl font-black text-primary tracking-tighter">${ticket.price.toFixed(2)}</p>
            </div>
            <Button
              className="rounded-2xl h-14 px-8 font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/10 group-hover:shadow-primary/20 transition-all"
            >
              View Listings
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TicketCard;