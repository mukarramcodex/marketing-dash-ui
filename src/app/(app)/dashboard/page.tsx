import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, Activity, UserCircle, BookOpen, Landmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold">Home Dashboard</h1>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Affiliates"
          value="1,234"
          icon={Users}
          description="+20.1% from last month"
        />
        <StatCard
          title="Active Affiliates"
          value="876"
          icon={Activity}
          description="+15% this week"
        />
        <StatCard
          title="Affiliate Products"
          value="56"
          icon={Package}
          description="Managed Products"
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-6 w-6 text-primary" />
              My Profile
            </CardTitle>
            <CardDescription>View and manage your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Keep your profile details up to date for seamless communication.</p>
            <Button asChild variant="outline">
              <Link href="/settings">Go to Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              My Courses
            </CardTitle>
            <CardDescription>Access your enrolled training courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Continue your learning journey and enhance your affiliate skills.</p>
            <Button asChild variant="outline">
              <Link href="/training">View Courses</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-6 w-6 text-primary" />
              Bank Details
            </CardTitle>
            <CardDescription>Manage your payout information.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Ensure your bank details are correct for timely earnings.</p>
            <Button asChild variant="outline">
              <Link href="/bank/details">Manage Bank Details</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-2xl font-headline font-semibold mb-4">Registration Section</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>1st Category Products</CardTitle>
              <CardDescription>Explore and promote products from our primary category.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image 
                src="https://placehold.co/600x300.png" 
                alt="Category 1 Products" 
                width={600} 
                height={300} 
                className="rounded-md mb-4 object-cover"
                data-ai-hint="technology business" 
              />
              <p className="text-muted-foreground mb-4">High-demand products with great commission rates. Perfect for starting strong.</p>
              <Button asChild>
                <Link href="/products/all?category=1">Explore Category 1</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>2nd Category Products</CardTitle>
              <CardDescription>Discover niche products in our secondary category.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image 
                src="https://placehold.co/600x300.png" 
                alt="Category 2 Products" 
                width={600} 
                height={300} 
                className="rounded-md mb-4 object-cover"
                data-ai-hint="lifestyle travel"
              />
              <p className="text-muted-foreground mb-4">Specialized items for targeted audiences. Expand your reach.</p>
              <Button asChild>
                <Link href="/products/all?category=2">Explore Category 2</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
