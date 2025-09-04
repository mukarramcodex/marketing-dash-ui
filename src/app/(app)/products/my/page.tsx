"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Link2, BarChart2, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

const myMockProducts = [
  { id: "PROD001", name: "ProSmart AI Assistant", category: "Software", price: 49.99, commission: "15%", imageUrl: "https://placehold.co/300x200.png", uniqueLink: "https://promillion.example/link/ai-assistant/john_doe", dataAiHint: "software office" },
  { id: "PROD003", name: "QuantumLeap Online Course", category: "Education", price: 199.00, commission: "20%", imageUrl: "https://placehold.co/300x200.png", uniqueLink: "https://promillion.example/link/q-course/john_doe", dataAiHint: "education online"  },
  { id: "PROD006", name: "Artisan Leather Wallet", category: "Fashion", price: 75.00, commission: "18%", imageUrl: "https://placehold.co/300x200.png", uniqueLink: "https://promillion.example/link/leather-wallet/john_doe", dataAiHint: "leather wallet"  },
];

export default function MyProductsPage() {
  const { toast } = useToast();
  const [myProducts, setMyProducts] = React.useState(myMockProducts);

  const handleRemoveFromMyProducts = (productId: string, productName: string) => {
    // UI only
    setMyProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Product Removed (UI Only)",
      description: `${productName} has been removed from 'My Products'. (Simulated)`,
      variant: "destructive"
    });
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: "Link Copied!",
        description: "Your unique affiliate link has been copied to the clipboard.",
      });
    }).catch(err => {
      toast({
        title: "Failed to Copy",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-headline font-bold">My Products</h1>
        <Button asChild>
          <Link href="/products/all">Discover More Products</Link>
        </Button>
      </div>

      {myProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts.map((product) => (
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
              <CardContent className="space-y-2">
                <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
                <p className="text-sm text-green-600 dark:text-green-400">Commission: {product.commission}</p>
                <div className="flex items-center gap-2 pt-2">
                  <input type="text" readOnly value={product.uniqueLink} className="text-xs h-8" />
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleCopyLink(product.uniqueLink)} aria-label="Copy link">
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                   <Link href={`/products/stats/${product.id}`}>
                    <BarChart2 className="mr-2 h-4 w-4" /> Stats
                   </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveFromMyProducts(product.id, product.name)} className="flex-1">
                  <Trash2 className="mr-2 h-4 w-4" /> Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              No Products Selected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You haven't added any products to promote yet.</p>
            <Button asChild>
              <Link href="/products/all">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
