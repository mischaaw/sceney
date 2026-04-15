"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  User,   ArrowLeft, 
  Zap,
  Heart,
  Bell, 
  BellOff,
  TrendingUp,
  ShieldAlert,
  Lock,
  Scale,
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight} from "lucide-react";
import PriceTrendChart from "@/components/PriceTrendChart";
import { showSuccess, showError } from "@/utils/toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>("rating-desc");
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [newOfferAmount, setNewOfferAmount] = useState("");

  // Fetch listing and offers
  useEffect(() => {
    const loadData = async () => {
      const { data: listingData, error: listingError } = await supabase
        .from("listings")
        .select(`
          *,
          events (title, date, location, image_url, category, description)
        `)
        .eq("id", id)
        .single();

      if (listingError) {
        showError("Listing not found");
        return;
      }

      const { data: offersData, error: offersError } = await supabase
        .from("offers")
        .select("*")
        .eq("listing_id", id)
        .order("created_at", { ascending: false });

      if (offersError) console.error(offersError);

      setListing(listingData);
      setOffers(offersData || []);
      setLoading(false);
    };

    loadData();
  }, [id, navigate]);

  const handleSendOffer = async () => {
    if (!listing) return;
    const amount = parseFloat(newOfferAmount);
    if (isNaN(amount) || amount <= 0) return;

    const { data, error } = await supabase
      .from("offers")
      .insert({
        listing_id: listing.id,
        buyer_id: (await supabase.auth.getUser()).data.user.id,
        amount,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      showError("Failed to send offer");
      return;
    }

    showSuccess("Offer sent! Waiting for seller to respond.");
    setNewOfferAmount("");
    // Refresh offers
    const { data: refreshedOffers } = await supabase
      .from("offers")
      .select("*")
      .eq("listing_id", id)
      .order("created_at", { ascending: false });
    setOffers(refreshedOffers);
  };

  const handleAcceptOffer = async (offerId: string) => {
    // Update offer status
    const { error } = await supabase
      .from("offers")
      .update({ status: "accepted" })
      .eq("id", offerId);

    if (error) {
      showError("Failed to accept offer");
      return;
    }

    // Trigger payment intent creation (edge function)
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(newOfferAmount) * 100 }),
    });

    const result = await response.json();
    const clientSecret = result.client_secret;

    // Navigate to checkout with client secret
    navigate(`/checkout?clientSecret=${clientSecret}&amount=${parseFloat(newOfferAmount)}`);
  };

  if (loading) return null;

  const event = listing?.events || {};
  const sortedOffers = [...offers].sort((a, b) => b.amount - a.amount);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-6xl flex-1">
        {/* ... existing UI (event details, price chart, etc.) ... */}

        {/* Offers Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-black text-primary tracking-tight">Offers</h2>
          {listing ? (
            <div className="space-y-6">
              {/* Pending Offers */}
              {sortedOffers.length > 0 ? (
                <div>
                  <h3 className="text-xl font-black text-primary">Pending Offers</h3>
                  {sortedOffers.map((offer) => (
                    <div key={offer.id} className="border-2 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-primary">Offer from Buyer</p>
                          <p className="text-xl font-black text-primary">${offer.amount.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          {offer.status === "pending" ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAcceptOffer(offer.id)}
                              className="rounded-full font-bold text-[10px] px-4 py-1 bg-primary text-white"
                            >
                              Accept
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="rounded-full font-bold text-[10px] px-4 py-1"
                            >
                              {offer.status}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-primary">No offers yet.</p>
              )}

              {/* Make Offer Form */}
              <div className="border-2 rounded-2xl p-4 bg-primary/5">
                <div className="flex flex-col gap-3">
                  <Label className="font-black text-[10px] uppercase tracking-widest text-primary-foreground/60">Your Offer ($)</Label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="e.g. 120.00"
                    value={newOfferAmount}
                    onChange={(e) => setNewOfferAmount(e.target.value)}
                    className="rounded-xl border-2 font-bold h-12 px-4 text-primary"
                  />
                  <Button 
                    onClick={handleSendOffer}
                    disabled={!newOfferAmount || isNaN(parseFloat(newOfferAmount))}
                    className="rounded-2xl font-bold h-12 shadow-lg shadow-primary/20"
                  >
                    Send Offer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading listing...</p>
          )}
        </div>

        {/* Rest of the page ... */}
        {/* ... existing code for event details, price chart, etc. ... */}
      </main>
      <Footer />
    </div>
  );
};

export default TicketDetails;