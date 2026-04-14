"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface TicketProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
  likes?: number; // optional likes
}

const TicketCard = ({ ticket }: { ticket: TicketProps }) => {
  const navigate = useNavigate();
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [newPrice, setNewPrice] = useState(ticket.price.toString());

  // Likes are now read‑only; no click handler
  const likeCount = ticket.likes ?? 0;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(e.target.value);
  };

  const savePrice = () => {
    const newPriceNum = parseFloat(newPrice);
    if (!isNaN(newPriceNum) && newPriceNum > 0) {
      console.log(`Price updated to $${newPriceNum}`);
    }
    setIsEditingPrice(false);
    setShowPriceInput(false);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/ticket/${ticket.id}`)}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden border-2 shadow-lg bg-white rounded-3xl h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <Badge className="absolute top-4 right-4 bg-primary text-white border-none px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">
            {ticket.category}
          </Badge>
        </div>

        <CardHeader className="p-5 pb-2 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black leading-tight text-primary">{ticket.title}</h3>
            <div className="flex items-center gap-2">
              {/* Heart icon kept for visual cue but disabled */}
              <Heart size={20} className="text-red-500 cursor-default" />
              <Badge variant="default" className="text-[9px] font-bold">
                {likeCount}
              </Badge>
            </div>
          </div>

          {showPriceInput && (
            <div className="mt-1 flex items-center gap-2">
              <Input
                type="number"
                placeholder="New price"
                value={newPrice}
                onChange={handlePriceChange}
                className="w-20 rounded-md border-2 text-center font-medium px-2"
              />
              <Button
                variant="ghost"
                className="rounded-md px-2 py-1 text-sm font-medium"
                onClick={savePrice}
              >
                Save
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-5 pt-0 space-y-3 flex-1">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar size={16} className="text-accent" />
            <span>{ticket.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin size={16} className="text-accent" />
            <span>{ticket.location}</span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-muted mt-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Price</p>
            <p className="text-xl font-black text-primary">${ticket.price.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full font-bold text-[10px] px-3 py-1"
              onClick={() => setIsEditingPrice(true)}
            >
              Edit Price
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full font-bold text-[10px] px-3 py-1"
              onClick={() => navigate(`/ticket/${ticket.id}`)}
            >
              Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TicketCard;