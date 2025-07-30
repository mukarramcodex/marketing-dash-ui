"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Search, Filter, ExternalLink, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

const mockProducts = [
  { id: "PROD001", name: "ProSmart AI Assistant", category: "Software", price: 49.99, commission: "15%", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "software office" },
  { id: "PROD002", name: "EcoLife Water Bottle", category: "Lifestyle", price: 24.50, commission: "10%", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "water bottle" },
  { id: "PROD003", name: "QuantumLeap Online Course", category: "Education", price: 199.00, commission: "20%", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "education online" },
  { id: "PROD004", name: "FitMax Fitness Tracker", category: "Electronics", price: 89.90, commission: "12%", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "fitness tracker" },
  { id: "PROD005", name: "Gourmet Coffee Beans", category: "Food & Beverage", price: 18.75, commission: "8%", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "coffee beans" },
  { id: "PROD006", name: "Artisan Leather Wallet", category: "Fashion", price: 75.00, commission: "18%", imageUrl: "https://placehold.co/300x200.png", dataAiHint: "leather wallet" },
];

const categories = ["All", ...new Set(mockProducts.map(p => p.category))];

export default function AllProductsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("All");

  const filteredProducts = mockProducts
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => categoryFilter === "All" || product.category === categoryFilter);

  const handleAddToMyProducts = (productId: string, productName: string) => {
    // UI only
    toast({
      title: "Product Added (UI Only)",
      description: `${productName} has been added to 'My Products'. (Simulated)`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-headline font-bold">All Products</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package />
            Product Catalog
          </CardTitle>
          <CardDescription>
            Browse all available products for promotion.
          </CardDescription>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    width={300} 
                    height={200} 
                    className="w-full h-48 object-cover"
                    data-ai-hint={product.dataAiHint}
                  />
                  <CardHeader className="flex-grow">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Commission: {product.commission}</p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                       <Link href={`/products/details/${product.id}`} target="_blank" rel="noopener noreferrer">
                        View Details <ExternalLink className="ml-2 h-3 w-3" />
                       </Link>
                    </Button>
                    <Button size="sm" onClick={() => handleAddToMyProducts(product.id, product.name)} className="flex-1">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add to My Products
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No products found matching your criteria.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
