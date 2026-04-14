"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Shield, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-20 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Logo className="brightness-0 invert" />
            <p className="text-white/60 max-w-sm font-medium leading-relaxed">
              The most secure, anonymous Penn marketplace for verified event tickets. 
              Operating under full escrow protection for your peace of mind.
            </p>
            <div className="flex gap-4">
              <a href="mailto:joinsceney@gmail.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Mail size={20} className="text-background" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-accent">Platform</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/" className="hover:text-accent transition-colors">Marketplace</Link></li>
              <li><Link to="/sell" className="hover:text-accent transition-colors">Sell Tickets</Link></li>
              <li><Link to="/how-it-works" className="hover:text-accent transition-colors">How it Works</Link></li>
              <li><Link to="/verification" className="hover:text-accent transition-colors">Verification</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-accent">Support</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Safety Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
              © 2026 SCENEY. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <Shield size={14} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Escrow Protection Active</span>
            </div>
          </div>
          
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-relaxed text-center">
              Disclaimer: Sceney is a peer-to-peer marketplace. While we provide escrow protection and verification services, Sceney is not liable for any financial loss, event cancellations, or disputes between parties. Users assume all risks associated with ticket transactions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;