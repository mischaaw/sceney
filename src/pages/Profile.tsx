"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { UserCircle, CreditCard, Bell, LogOut, ChevronRight, Smartphone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) setProfile(data);
        if (error) console.error(error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
      })
      .eq('id', user.id);

    if (error) {
      showError("Failed to update profile.");
    } else {
      showSuccess("Profile updated successfully!");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center text-white shadow-2xl">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover rounded-[2rem]" />
            ) : (
              <UserCircle size={48} />
            )}
          </div>
          <div>
            <h1 className="text-5xl font-black text-primary tracking-tighter">Profile</h1>
            <div className="flex items-center gap-3 mt-1">
              <StarRating rating={4.9} size={16} />
              <span className="text-sm font-black text-accent">4.9 Seller Rating</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <nav className="space-y-2">
              {[
                { icon: UserCircle, label: "General" },
                { icon: CreditCard, label: "Payouts" },
                { icon: Bell, label: "Notifications" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`
                    w-full flex items-center justify-between p-4 rounded-2xl font-black text-xs uppercase tracking-widest
                    transition-all
                    ${activeTab === item.label ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-primary/60 hover:bg-primary/5"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  <ChevronRight size={14} className={activeTab === item.label ? "opacity-100" : "opacity-0"} />
                </button>
              ))}
            </nav>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-widest text-destructive hover:text-destructive hover:bg-destructive/5"
            >
              <LogOut size={18} />
              Sign Out
            </Button>
          </div>

          <div className="md:col-span-2 space-y-8">
            {activeTab === "General" && (
              <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/10">
                  <CardTitle className="text-2xl font-black tracking-tight">Account Information</CardTitle>
                  <CardDescription className="font-medium">Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">First Name</Label>
                        <Input 
                          value={profile?.first_name || ''} 
                          onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                          className="h-12 rounded-xl border-2 font-bold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Last Name</Label>
                        <Input 
                          value={profile?.last_name || ''} 
                          onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                          className="h-12 rounded-xl border-2 font-bold" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                      <Input 
                        value={profile?.phone_number || ''} 
                        onChange={(e) => setProfile({...profile, phone_number: e.target.value})}
                        className="h-12 rounded-xl border-2 font-bold" 
                      />
                    </div>
                    <Button type="submit" className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === "Payouts" && (
              <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/10">
                  <CardTitle className="text-2xl font-black tracking-tight">Payout Settings</CardTitle>
                  <CardDescription className="font-medium">Manage how you receive your earnings from ticket sales.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between p-6 bg-green-50 rounded-2xl border-2 border-green-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <p className="font-black text-primary">Payment Method</p>
                        <p className="text-xs text-muted-foreground font-medium">•••• •••• •••• 4242</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-black text-primary">Available Balance</p>
                      <p className="text-2xl font-black text-primary">$0.00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "Notifications" && (
              <Card className="border-2 shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/10">
                  <CardTitle className="text-2xl font-black tracking-tight">Notification Settings</CardTitle>
                  <CardDescription className="font-medium">Manage your notification preferences.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="text-accent" size={24} />
                          <h4 className="text-xl font-black">SMS Alerts</h4>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">Receive instant chat messages and price drops via text.</p>
                    </div>
                    <div className="p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="text-primary" size={24} />
                          <h4 className="text-xl font-black">Email Alerts</h4>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">Get notified about sales, payouts, and security updates.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;