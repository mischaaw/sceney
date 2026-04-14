"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface PriceDataItem {
  date: string;
  low: number;
  high: number;
}

interface PriceTrendChartProps {
  data: PriceDataItem[];
  category: string;
}

const PriceTrendChart = ({ data, category }: PriceTrendChartProps) => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <span className="text-accent">{category}</span>
      </div>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip             contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',               borderColor: 'hsl(var(--border))', 
              borderRadius: '1rem' 
            }} 
            labelStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
          />
          <Line type="monotone" dataKey="low" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))' }} />
          <Line type="monotone" dataKey="high" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: 'hsl(var(--accent))' }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-8 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-primary rounded-full"></div>
          <span className="text-sm font-bold text-primary">Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-accent rounded-full"></div>
          <span className="text-sm font-bold text-accent">High</span>
        </div>
      </div>
    </div>
  );
};

export default PriceTrendChart;