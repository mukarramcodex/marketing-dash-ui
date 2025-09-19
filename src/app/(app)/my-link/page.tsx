"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link2, Copy, Share2, QrCode } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function MyAffiliateLinkPage() {
  const { toast } = useToast();
  // This would typically come from user data
  const uniqueAffiliateId = "mukarramali_9669"; 
  const baseAffiliateUrl = `https://promillion.marketing/ref/${uniqueAffiliateId}`;

  const [affiliateLink, setAffiliateLink] = React.useState(baseAffiliateUrl);
  const [customSlug, setCustomSlug] = React.useState("");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink).then(() => {
      toast({
        title: "Link Copied!",
        description: "Your affiliate link has been copied to the clipboard.",
      });
    }).catch(err => {
      toast({
        title: "Failed to Copy",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
      });
    });
  };
  
  const handleApplyCustomSlug = () => {
    if (customSlug.trim()) {
      // Basic slug validation (simplified)
      const newSlug = customSlug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      if (newSlug) {
        setAffiliateLink(`${baseAffiliateUrl}?campaign=${newSlug}`);
        toast({
          title: "Custom Slug Applied",
          description: `Your link now includes the campaign: ${newSlug}`,
        });
      } else {
        toast({
          title: "Invalid Custom Slug",
          description: "Please use alphanumeric characters and hyphens.",
          variant: "destructive"
        });
      }
    } else {
      setAffiliateLink(baseAffiliateUrl); // Reset to base if slug is empty
       toast({
          title: "Custom Slug Removed",
          description: "Your link has been reset to the default.",
        });
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(affiliateLink)}`;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-headline font-bold text-center">My Unique Affiliate Link</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <Link2 className="h-6 w-6 text-primary" />
            Your Referral Link
          </CardTitle>
          <CardDescription className="text-center">
            Share this link to earn commissions on referrals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input 
              type="text" 
              value={affiliateLink} 
              readOnly 
              className="text-lg h-12 bg-muted flex-grow"
              aria-label="Your affiliate link"
            />
            <Button onClick={handleCopyLink} size="lg" aria-label="Copy link">
              <Copy className="mr-2 h-5 w-5" /> Copy
            </Button>
          </div>

          <div>
            <label htmlFor="customSlug" className="block text-sm font-medium text-muted-foreground mb-1">Add a custom campaign slug (optional):</label>
            <div className="flex items-center space-x-2">
              <Input 
                id="customSlug"
                type="text"
                placeholder="e.g., summer-promo or new-product"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                className="h-10"
              />
              <Button onClick={handleApplyCustomSlug} variant="outline" className="h-10">Apply Slug</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">This helps track specific campaigns. e.g., {baseAffiliateUrl}?campaign=your-slug</p>
          </div>
          
          <div className="text-center pt-4">
             <h3 className="text-md font-semibold mb-2">Share via QR Code</h3>
             <div className="flex justify-center">
                <Image src={qrCodeUrl} alt="Affiliate Link QR Code" width={150} height={150} className="border rounded-md p-1 bg-white" data-ai-hint="qrcode"/>
             </div>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
            <Button variant="outline" size="lg">
              <Share2 className="mr-2 h-5 w-5" /> Share
            </Button>
            {/* Add more sharing options here if needed, e.g., social media buttons */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Tips for Sharing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <li>Include your link in your blog posts and articles.</li>
            <li>Share it on your social media profiles and posts.</li>
            <li>Add it to your email signature.</li>
            <li>Use the QR code on physical marketing materials.</li>
            <li>Create specific campaign slugs to track performance from different sources.</li>
        </CardContent>
      </Card>
    </div>
  );
}
