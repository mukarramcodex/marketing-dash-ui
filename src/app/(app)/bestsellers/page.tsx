"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, Filter, Search, User, ShoppingBag } from "lucide-react";
import Image from "next/image";
import * as React from "react";

const mockProducts = [
  { id: "P001", name: "Premium Smartwatch X1", sales: 1250, revenue: 249875, category: "Electronics", image: "https://placehold.co/100x100.png", dataAiHint: "smartwatch technology" },
  { id: "P002", name: "Organic Green Tea Blend", sales: 980, revenue: 24500, category: "Groceries", image: "https://placehold.co/100x100.png", dataAiHint: "tea health" },
  { id: "P003", name: "Pro Fitness Yoga Mat", sales: 750, revenue: 29925, category: "Sports", image: "https://placehold.co/100x100.png", dataAiHint: "yoga fitness" },
  { id: "P004", name: "AI Content Creation Tool (Subscription)", sales: 620, revenue: 61380, category: "Software", image: "https://placehold.co/100x100.png", dataAiHint: "software ai" },
  { id: "P005", name: "Luxury Leather Handbag", sales: 450, revenue: 112500, category: "Fashion", image: "https://placehold.co/100x100.png", dataAiHint: "handbag fashion" },
];

const mockAffiliates = [
  { id: "A001", name: "John Doe", sales: 350, revenue: 87500, image: "https://placehold.co/40x40.png?text=JD", dataAiHint: "person portrait" },
  { id: "A002", name: "Jane Smith", sales: 280, revenue: 70000, image: "https://placehold.co/40x40.png?text=JS", dataAiHint: "woman smiling" },
  { id: "A003", name: "Mike Brown", sales: 210, revenue: 52500, image: "https://placehold.co/40x40.png?text=MB", dataAiHint: "man professional" },
];

export default function BestSellersPage() {
  const [filterType, setFilterType] = React.useState("products"); // products or affiliates
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const filteredProducts = mockProducts
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => categoryFilter === "all" || p.category.toLowerCase() === categoryFilter);

  const filteredAffiliates = mockAffiliates
    .filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-headline font-bold">Best Sellers</h1>
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="products">Top Products</SelectItem>
              <SelectItem value="affiliates">Top Affiliates</SelectItem>
            </SelectContent>
          </Select>
          {filterType === "products" && (
             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Groceries">Groceries</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {filterType === "products" ? <ShoppingBag /> : <User />}
            {filterType === "products" ? "Top Selling Products" : "Top Performing Affiliates"}
          </CardTitle>
          <CardDescription>
            List of {filterType === "products" ? "products" : "affiliates"} with the highest sales performance.
          </CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={`Search ${filterType}...`} 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filterType === "products" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image src={product.image} alt={product.name} width={40} height={40} className="rounded" data-ai-hint={product.dataAiHint} />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.sales.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Revenue Generated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAffiliates.map((affiliate) => (
                  <TableRow key={affiliate.id}>
                    <TableCell>
                      <Image src={affiliate.image} alt={affiliate.name} width={40} height={40} className="rounded-full" data-ai-hint={affiliate.dataAiHint} />
                    </TableCell>
                    <TableCell className="font-medium">{affiliate.name}</TableCell>
                    <TableCell className="text-right">{affiliate.sales.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${affiliate.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
           {(filterType === "products" && filteredProducts.length === 0) && <p className="text-center text-muted-foreground py-4">No products found matching your criteria.</p>}
           {(filterType === "affiliates" && filteredAffiliates.length === 0) && <p className="text-center text-muted-foreground py-4">No affiliates found matching your criteria.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
