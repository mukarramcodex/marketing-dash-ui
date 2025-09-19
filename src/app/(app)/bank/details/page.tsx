"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Edit, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import * as React from "react";

// Mock data for bank details
const mockBankDetails = [
  {
    id: "bd001",
    bankName: "Meezan Bank LTD.",
    accountHolderName: "Muhammad Mukarram Ali",
    accountNumberLast4: "XXXX-3832",
    currency: "PKR",
    isPrimary: true,
  },
  {
    id: "bd002",
    bankName: "Easy Paisa Digital Bank",
    accountHolderName: "Muhammad Mukarram Ali",
    accountNumberLast4: "XXXX-9669",
    currency: "PKR",
    isPrimary: false,
  },
];

export default function MyBankDetailsPage() {
  const { toast } = useToast();
  const [bankAccounts, setBankAccounts] = React.useState(mockBankDetails);

  const handleEdit = (id: string) => {
    // UI only - In a real app, this would navigate to an edit form or open a modal
    toast({
      title: "Edit Bank Details (UI Only)",
      description: `Editing details for account ID: ${id}. (Not implemented)`,
    });
  };

  const handleDelete = (id: string) => {
    // UI only
    setBankAccounts(prev => prev.filter(acc => acc.id !== id));
    toast({
      title: "Bank Details Deleted (UI Only)",
      description: `Account ID: ${id} has been removed from the list.`,
    });
  };

  const handleSetPrimary = (id: string) => {
    // UI only
    setBankAccounts(prev => 
      prev.map(acc => ({ ...acc, isPrimary: acc.id === id }))
    );
    toast({
      title: "Primary Account Updated (UI Only)",
      description: `Account ID: ${id} is now set as primary.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-headline font-bold">My Bank Details</h1>
        <Button asChild>
          <Link href="/bank/new"><PlusCircle className="mr-2 h-4 w-4" /> Add New Account</Link>
        </Button>
      </div>

      {bankAccounts.length > 0 ? (
        <div className="space-y-6">
          {bankAccounts.map((account) => (
            <Card key={account.id} className={`transition-all duration-300 hover:shadow-md ${account.isPrimary ? 'border-primary border-2 shadow-lg' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Landmark className={account.isPrimary ? "text-primary" : ""} />
                      {account.bankName}
                      {account.isPrimary && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Primary</span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Account ending in {account.accountNumberLast4} ({account.currency})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(account.id)} aria-label="Edit account">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(account.id)} aria-label="Delete account" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p><strong>Account Holder:</strong> {account.accountHolderName}</p>
                {!account.isPrimary && (
                  <Button onClick={() => handleSetPrimary(account.id)} variant="outline" size="sm" className="mt-4">
                    Set as Primary
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Landmark className="h-8 w-8 text-muted-foreground" />
              No Bank Details Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You haven't added any bank accounts yet. Add one to receive payouts.</p>
            <Button asChild>
              <Link href="/bank/new"><PlusCircle className="mr-2 h-4 w-4" /> Add Bank Account</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
