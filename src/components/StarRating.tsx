"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
  className?: string;
}

const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 16, 
  onRate, 
  interactive = false,
  className 
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(maxRating)].map((_, i) => {
        const starValue = i + 1;
        const isActive = interactive 
          ? (hoverRating || rating) >= starValue 
          : rating >= starValue;

        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-all duration-200",
              isActive ? "fill-accent text-accent" : "text-muted-foreground/30",
              interactive && "cursor-pointer hover:scale-125 active:scale-95"
            )}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && onRate?.(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;