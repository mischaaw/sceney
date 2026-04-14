"use client";

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, ShieldCheck, PlusCircle, LayoutDashboard, UserCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navLinks = [
    { name: 'Marketplace', path: '/' },
    { name: 'How it Works', path: '/how-it-works', icon: Info },
    { name: 'Sell', path: '/sell', icon: PlusCircle },
    { name: 'Inbox', path: '/messages', icon: MessageSquare },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 py-2 px-4 rounded-full",
                location.pathname === link.path 
                  ? "bg-primary text-white" 
                  : "text-primary/60 hover:text-primary hover:bg-primary/5"
              )}
            >
              {link.icon && <link.icon size={14} />}
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5" title="Admin Monitor">
              <ShieldCheck className="w-5 h-5 text-primary/60" />
            </Button>
          </Link>
          <div className="h-8 w-[1px] bg-border mx-2 hidden sm:block" />
          <Button 
            variant="ghost" 
            className="rounded-full font-bold gap-2 hidden sm:flex"
            onClick={() => navigate('/profile')}
          >
            <UserCircle size={20} />
            Profile
          </Button>
          <Button className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 sm:hidden">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;