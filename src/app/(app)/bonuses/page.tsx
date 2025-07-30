"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, CheckCircle, Clock, Award } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

type BonusStatus = "Available" | "Claimed" | "Expired";

const mockBonuses = [
  { id: "BON001", title: "Welcome Bonus", description: "Achieve $100 in sales in your first month.", requirement: "$100 Sales in 30 days", reward: "$25 Cash Bonus", status: "Available" as BonusStatus, expiryDate: "2024-08-31" },
  { id: "BON002", title: "Top Performer Q3", description: "Be in the top 10% of affiliates by revenue in Q3.", requirement: "Top 10% Revenue Q3", reward: "Luxury Gift Set", status: "Claimed" as BonusStatus, claimDate: "2024-07-05" },
  { id: "BON003", title: "Early Bird Special", description: "Promote new product X within first week of launch.", requirement: "Promote Product X (Launch Week)", reward: "Extra 5% Commission on Product X", status: "Expired" as BonusStatus, expiryDate: "2024-06-15" },
  { id: "BON004", title: "Consistency King", description: "Make at least 1 sale every week for 4 consecutive weeks.", requirement: "1 Sale/Week for 4 Weeks", reward: "$50 Bonus Credit", status: "Available" as BonusStatus, progress: "2/4 Weeks" },
];

export default function BonusesPage() {
  const { toast } = useToast();
  const [bonuses, setBonuses] = React.useState(mockBonuses);

  const handleClaimBonus = (bonusId: string, bonusTitle: string) => {
    // UI only
    setBonuses(prev => prev.map(b => b.id === bonusId ? {...b, status: "Claimed", claimDate: new Date().toISOString().split('T')[0]} : b));
    toast({
      title: "Bonus Claimed (UI Only)",
      description: `You have successfully claimed the "${bonusTitle}" bonus. (Simulated)`,
    });
  };

  const getStatusIcon = (status: BonusStatus) => {
    if (status === "Claimed") return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === "Expired") return <Clock className="h-5 w-5 text-red-500" />;
    return <Award className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold">Bonuses Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonuses.map((bonus) => (
          <Card key={bonus.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gift className="text-primary" /> {bonus.title}
                </CardTitle>
                {getStatusIcon(bonus.status)}
              </div>
              <CardDescription>{bonus.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <p><strong className="font-medium">Requirement:</strong> {bonus.requirement}</p>
              <p><strong className="font-medium">Reward:</strong> <span className="text-green-600 dark:text-green-400 font-semibold">{bonus.reward}</span></p>
              {bonus.progress && <p><strong className="font-medium">Progress:</strong> {bonus.progress}</p>}
              {bonus.status === "Available" && bonus.expiryDate && (
                <p className="text-sm text-muted-foreground">Expires: {bonus.expiryDate}</p>
              )}
              {bonus.status === "Claimed" && bonus.claimDate && (
                <p className="text-sm text-green-500">Claimed on: {bonus.claimDate}</p>
              )}
               {bonus.status === "Expired" && bonus.expiryDate && (
                <p className="text-sm text-red-500">Expired on: {bonus.expiryDate}</p>
              )}
            </CardContent>
            <CardFooter>
              {bonus.status === "Available" ? (
                <Button 
                  onClick={() => handleClaimBonus(bonus.id, bonus.title)} 
                  className="w-full"
                  // disabled={bonus.progress && bonus.progress !== "4/4 Weeks"} // Example logic for disabling
                >
                  Claim Bonus
                </Button>
              ) : (
                <Button disabled className="w-full">{bonus.status}</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      {bonuses.length === 0 && (
         <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Gift className="h-8 w-8 text-muted-foreground" />
              No Bonuses Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Check back later for new bonus opportunities!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
