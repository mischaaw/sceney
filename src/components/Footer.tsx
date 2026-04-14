"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Shield, Scale, Info, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white ptthink
The previous response was cut off in the middle of `src/components/Footer.tsx`. I need to complete that file and then proceed to update `src/pages/TicketDetails.tsx` as planned (recoloring icons to creme).

Looking at the previous output:
`<dyad-write path="src/components/Footer.tsx" description="Fixing the logo in the footer and ensuring it loads correctly.">
"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Shield, Scale, Info, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt`

I need to finish `Footer.tsx` and then write `TicketDetails.tsx`.

Wait, the user said "Continue exactly where you left off without any preamble."
This usually means I should just provide the code blocks.

However, I must follow the system instructions:
- Use `<dyad-write>` for creating or updating files.
- Only one `<dyad-write>` block per file.
- Provide a CONCISE summary at the end.
- Include `<dyad-chat-summary>`.

The previous response was cut off. I will provide the full `Footer.tsx` and then `TicketDetails.tsx`.

Actually, if I "continue exactly where I left off", I should probably just finish the `Footer.tsx` block and then do the rest. But the system requires valid XML tags. So I'll provide the full file content for `Footer.tsx` and then `TicketDetails.tsx`.

Wait, the user prompt says "Continue exactly where you left off without any preamble."
If I just start typing code, it might break the XML structure if I don't wrap it in `<dyad-write>`.
The system instructions say: "NEVER, EVER use markdown code blocks (```) for code. ONLY use <dyad-write> tags for ALL code output."

So I will provide the full `Footer.tsx` and `TicketDetails.tsx`.

**File 1: src/components/Footer.tsx**
I'll finish the footer.

**File 2: src/pages/TicketDetails.tsx**
I'll update the icons in the "Sceney Guarantee" section to use the creme color (`text-[#fdf5e6]`).

Let's check the creme color.
In `src/globals.css`:
`--background: 39 77% 95%; /* Creme White #fdf5e6 */`
So I can use `text-[#fdf5e6]` or `text-background` (since background is creme).

Let's go.-20 pb-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Logo className="brightness-0 invert" />
            <p className="text-white/60 max-w-md font-medium leading-relaxed">
              The most secure, anonymous marketplace for verified Penn event tickets. 
              Built for the community, by the community.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <Shield className="text-accent" size={20} />
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <Scale className="text-accent" size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-accent">Platform</h4>
            <ul className="space-y-4 font-bold text-sm text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell Tickets</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><Link to="/verification" className="hover:text-white transition-colors">Verification</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-accent">Legal</h4>
            <ul className="space-y-4 font-bold text-sm text-white/60">
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 space-y-8">
          <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <Info className="text-background shrink-0" size={20} />
              <h5 className="font-black text-sm uppercase tracking-widest">Terms & Conditions Summary</h5>
            </div>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              Sceney is a secondary marketplace and does not own, set prices for, or sell tickets. 
              By using this platform, you acknowledge that Sceney acts solely as an intermediary. 
              To the maximum extent permitted by law, Sceney, its founders, and affiliates shall not be held liable for any damages, 
              losses, or disputes arising from ticket authenticity, event cancellations, or seller/buyer misconduct. 
              Users agree that any fault with tickets must be resolved directly between the transacting parties. 
              By proceeding with any transaction, you waive the right to pursue legal action against Sceney for marketplace-related issues.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
            <p>© 2024 SCENEY. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <span className="flex items-center gap-2">STATUS: OPERATIONAL <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /></span>
              <span className="flex items-center gap-2">ENCRYPTION: AES-256 <ExternalLink size={10} /></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;