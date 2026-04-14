"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShoppingBag, User } from 'lucide-react';

const ACTIVITIES = [
  { id: 1, text: "Anonymous Seller #4821 just listed 2 Beer Garden tickets", icon: Zap },
  { id: 2, text: "User_88 purchased a Tropics ticket", icon: ShoppingBag },
  { id: 3, text: "New verified student joined the scene", icon: User },
  { id: 4, text: "Price drop: Beer Garden tickets now $40", icon: Zap },
];

const LiveActivityTicker = () => {
  return (
    <div className="bg-accent/10 border-y border-accent/20 py-3 overflow-hidden whitespace-nowrap">
      <motion.div 
        className="flex gap-12 items-center"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...ACTIVITIES, ...ACTIVITIES].map((activity, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <activity.icon size={14} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
              {activity.text}
            </span>
            <div className="w-1 h-1 bg-accent rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LiveActivityTicker;