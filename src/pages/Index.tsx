"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import TicketCard from '@/components/TicketCard';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShieldCheck, Zap, Lock, MessageSquare, ChevronDown } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MOCK_TICKETS = [
  {
    id: '1',
    title: 'Old City Beer Garden',
    date: 'Apr 25, 2026 • 12:00 PM',
    location: 'Old City Beer Garden',
    price: 45,
    image: 'dyad-media://media/emerald-manatee-scurry/.dyad/media/f808b8759f5aa66325dcfa7b2978c5b1.png',
    category: 'Social',
    likes: 0,
  },
];