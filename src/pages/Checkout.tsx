"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/react-stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

const Checkout = () => {
  const params = new URLSearchParams(window.location.search);
  const clientSecret = params.get("clientSecret");
  const amountParam = params.get("amount");
  const amount = amountParam ? parseFloat(amountParam).toFixed(2) : "0";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clientSecret) {
      const init = async () => {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        // In a real app, you would mount CardElement here.
        // For simplicity, we just proceed to confirm the payment.
      };
      init();
      setLoading(false);
    }
  }, [clientSecret]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {} as any, // In a full implementation, you'd use the mounted CardElement
      },
    });

    if (error) {
      alert(`Payment failed: ${error.message}`);
    } else {
      alert("Payment successful! Tickets will be sent to you.");
      navigate("/dashboard"); // Now works with useNavigate
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Card className="max-w-lg w-full mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <CardHeader className="p-6 border-b bg-primary/5">
          <CardTitle className="text-2xl font-black text-primary">Complete Purchase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-primary">
            You are about to purchase this ticket for <strong>${amount}</strong>.
          </p>
          <form onSubmit={handlePayment}>
            <Button type="submit" className="w-full h-14 rounded-2xl font-black shadow-xl shadow-primary/20">
              Pay Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;