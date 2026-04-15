"use client";

import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          navigate("/");
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <Card className="max-w-md w-full border-2 shadow-2xl rounded-[3rem] overflow-hidden">
          <CardHeader className="p-10 pb-0 text-center">
            <CardTitle className="text-4xl font-black text-primary tracking-tighter">
              Create Your <span className="text-accent italic">Sceney</span> Account
            </CardTitle>
            <p className="text-muted-foreground mt-2 font-medium">
              Sign up with email, phone, and password.
            </p>
          </CardHeader>
          <CardContent className="p-10">
            <Auth
              supabaseClient={supabase}
              providers={[]}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "hsl(var(--primary))",
                      brandAccent: "hsl(var(--accent))",
                    },
                    radii: {
                      buttonRadius: "1rem",
                      inputRadius: "1rem",
                    },
                  },
                },
              }}
              theme="light"
              view="sign_up"
              additionalData={{
                first_name: "",
                last_name: "",
                phone_number: "",
              }}
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;