"use client";

import React from 'react';
import { Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconSize?: number;
}

const Logo = ({ className, iconSize = 24 }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative">
        <div className="bg-primary p-2 rounded-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-primary/20">
          <Ticket size={iconSize} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background animate-pulse" />
      </div>
      <span className="text-2xl font-black tracking-tighter text-primary">
        scene<span className="text-accent italic">y</span>
      </span>
    </div>
  );
};

export default Logo;