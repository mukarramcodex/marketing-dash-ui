"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

const mockInvoices = [
  { id: "INV-2024-001", date: "2024-07-15", amount: 1250.75, status: "Paid" },
  { id: "INV-2024-002", date: "2024-07-28", amount: 875.00, status: "Pending" },
  { id: "INV-2024-003", date: "2024-06-30", amount: 2100.50, status: "Paid" },
  { id: "INV-2024-004", date: "2024-06-15", amount: 550.20, status: "Paid" },
  { id: "INV-2024-005", date: "2024-05-31", amount: 1500.00, status: "Overdue" },
];

export default function MyInvoicesPage() {
  const { toast } = useToast();

  const handleDownload = (invoiceId: string) => {
    // UI only
    toast({
      title: "Download Requested (UI Only)",
      description: `Downloading invoice ${invoiceId}... (simulated)`,
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold">My Invoices</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText />
            Invoice History
          </CardTitle>
          <CardDescription>
            Review your past and current invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        invoice.status === "Paid" ? "default" :
                        invoice.status === "Pending" ? "secondary" :
                        "destructive"
                      }
                      className={
                        invoice.status === "Paid" ? "bg-green-500 hover:bg-green-600 text-white" :
                        invoice.status === "Pending" ? "bg-yellow-500 hover:bg-yellow-600 text-black" :
                        "" // Destructive is already red
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(invoice.id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {mockInvoices.length === 0 && <p className="text-center text-muted-foreground py-4">No invoices found.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
