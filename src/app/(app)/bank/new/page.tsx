"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Landmark } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const bankDetailsSchema = z.object({
  accountHolderName: z.string().min(1, "Account holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  routingNumber: z.string().optional(), // ABA for US, etc.
  iban: z.string().optional(),
  swiftBic: z.string().optional(),
  bankAddress: z.string().optional(),
  country: z.string().min(1, "Bank country is required"),
  currency: z.string().min(1, "Preferred currency is required"),
  additionalNotes: z.string().optional(),
});

type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "AU", label: "Australia" },
];

const currencies = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "AUD", label: "AUD - Australian Dollar" },
];


export default function NewBankDetailsPage() {
  const { toast } = useToast();
  const { control, register, handleSubmit, formState: { errors } } = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
  });

  const onSubmit = (data: BankDetailsFormData) => {
    console.log("New bank details:", data);
    // UI only
    toast({
      title: "Bank Details Submitted (UI Only)",
      description: "Your bank details have been logged to the console.",
    });
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-headline font-bold">Add New Bank Details</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark />
            Payout Information
          </CardTitle>
          <CardDescription>
            Provide your bank account details for receiving payouts. Ensure all information is accurate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input id="accountHolderName" {...register("accountHolderName")} />
              {errors.accountHolderName && <p className="text-sm text-destructive mt-1">{errors.accountHolderName.message}</p>}
            </div>

            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" {...register("bankName")} />
              {errors.bankName && <p className="text-sm text-destructive mt-1">{errors.bankName.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input id="accountNumber" {...register("accountNumber")} />
                {errors.accountNumber && <p className="text-sm text-destructive mt-1">{errors.accountNumber.message}</p>}
              </div>
              <div>
                <Label htmlFor="routingNumber">Routing Number (e.g., ABA for US)</Label>
                <Input id="routingNumber" {...register("routingNumber")} />
                {errors.routingNumber && <p className="text-sm text-destructive mt-1">{errors.routingNumber.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="iban">IBAN (International Bank Account Number)</Label>
                <Input id="iban" {...register("iban")} />
                {errors.iban && <p className="text-sm text-destructive mt-1">{errors.iban.message}</p>}
              </div>
              <div>
                <Label htmlFor="swiftBic">SWIFT/BIC Code</Label>
                <Input id="swiftBic" {...register("swiftBic")} />
                {errors.swiftBic && <p className="text-sm text-destructive mt-1">{errors.swiftBic.message}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="bankAddress">Bank Address (Optional)</Label>
              <Textarea id="bankAddress" {...register("bankAddress")} />
              {errors.bankAddress && <p className="text-sm text-destructive mt-1">{errors.bankAddress.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="country">Bank Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select bank country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
              </div>
              <div>
                <Label htmlFor="currency">Preferred Currency</Label>
                 <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.currency && <p className="text-sm text-destructive mt-1">{errors.currency.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
              <Textarea id="additionalNotes" {...register("additionalNotes")} placeholder="Any specific instructions for your bank or payout." />
            </div>

            <Button type="submit" className="w-full md:w-auto">Save Bank Details</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
