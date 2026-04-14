"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className, size = 40 }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative">
        <img 
          src="dyad-media://media/emerald-manatee-scurry/.dyad/media/0d199e86fa0ff84f8527dd858b886357.png" 
          alt="Sceney Logo" 
          style={{ width: size, height: 'auto' }}
          className="transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-2xl font-black tracking-tighter text-primary">
        scene<span className="text-accent italic">y</span>
      </span>
    </div>
  );
};

export default Logo;