"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Mail, Phone, BarChart3, MessageSquare } from "lucide-react";
import * as React from "react";
import Link from "next/link";

const mockAffiliates = [
  { id: "AFF001", name: "Alice Wonderland", email: "alice@example.com", phone: "555-1234", joinDate: "2023-01-15", totalSales: 152, totalRevenue: 35600.50, status: "Active", avatar: "https://placehold.co/40x40.png?text=AW", dataAiHint: "woman smiling" },
  { id: "AFF002", name: "Bob The Builder", email: "bob@example.com", phone: "555-5678", joinDate: "2023-03-22", totalSales: 89, totalRevenue: 19850.00, status: "Active", avatar: "https://placehold.co/40x40.png?text=BB", dataAiHint: "man construction" },
  { id: "AFF003", name: "Charlie Chaplin", email: "charlie@example.com", phone: "555-9012", joinDate: "2023-05-10", totalSales: 205, totalRevenue: 47800.75, status: "Active", avatar: "https://placehold.co/40x40.png?text=CC", dataAiHint: "classic actor" },
  { id: "AFF004", name: "Diana Prince", email: "diana@example.com", phone: "555-3456", joinDate: "2023-02-01", totalSales: 45, totalRevenue: 9500.20, status: "Inactive", avatar: "https://placehold.co/40x40.png?text=DP", dataAiHint: "woman hero" },
  { id: "AFF005", name: "Edward Scissorhands", email: "edward@example.com", phone: "555-7890", joinDate: "2023-06-30", totalSales: 112, totalRevenue: 25000.00, status: "Active", avatar: "https://placehold.co/40x40.png?text=ES", dataAiHint: "man unique" },
];

export default function AllAffiliatesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filteredAffiliates = mockAffiliates
    .filter(affiliate => 
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(affiliate => 
      statusFilter === "all" || affiliate.status.toLowerCase() === statusFilter
    );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-headline font-bold">All Affiliates</h1>
        <Button asChild>
          <Link href="/affiliates/invite">Invite New Affiliate</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users />
            Affiliate Roster
          </CardTitle>
          <CardDescription>
            Manage and view all registered affiliates.
          </CardDescription>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Total Sales</TableHead>
                  <TableHead className="text-right">Total Revenue</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAffiliates.map((affiliate) => (
                  <TableRow key={affiliate.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={affiliate.avatar} alt={affiliate.name} data-ai-hint={affiliate.dataAiHint} />
                          <AvatarFallback>{affiliate.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{affiliate.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3"/> {affiliate.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3"/> {affiliate.phone}
                      </div>
                    </TableCell>
                    <TableCell>{affiliate.joinDate}</TableCell>
                    <TableCell className="text-right">{affiliate.totalSales.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${affiliate.totalRevenue.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${affiliate.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"}`}>
                        {affiliate.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <BarChart3 className="h-4 w-4" />
                        <span className="sr-only">View Stats</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                         <span className="sr-only">Message</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredAffiliates.length === 0 && <p className="text-center text-muted-foreground py-4">No affiliates found matching your criteria.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
