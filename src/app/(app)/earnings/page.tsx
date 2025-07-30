"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { Calendar as CalendarIcon, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, subDays } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";

const initialChartData = [
  { month: "January", earnings: Math.floor(Math.random() * 5000) + 1000, desktop: 200, mobile: 150 },
  { month: "February", earnings: Math.floor(Math.random() * 5000) + 1000, desktop: 220, mobile: 180 },
  { month: "March", earnings: Math.floor(Math.random() * 5000) + 1000, desktop: 250, mobile: 200 },
  { month: "April", earnings: Math.floor(Math.random() * 5000) + 1000, desktop: 180, mobile: 220 },
  { month: "May", earnings: Math.floor(Math.random() * 5000) + 1000, desktop: 300, mobile: 250 },
  { month: "June", earnings: Math.floor(Math.random() * 5000) + 1000, desktop: 280, mobile: 210 },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies import("@/components/ui/chart").ChartConfig;


export default function EarningsPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });
  const [chartData, setChartData] = React.useState(initialChartData);

  const handleApplyFilters = () => {
    // Simulate fetching new data based on filters
    const newData = initialChartData.map(item => ({
      ...item,
      earnings: Math.floor(Math.random() * 5000) + 1000,
      desktop: Math.floor(Math.random() * 300) + 100,
      mobile: Math.floor(Math.random() * 300) + 100,
    }));
    setChartData(newData);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-headline font-bold">Earning Dashboard</h1>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[260px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleApplyFilters}>
            <Filter className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings Overview</CardTitle>
          <CardDescription>
            {date?.from && date?.to
              ? `Showing data from ${format(date.from, "LLL dd, y")} to ${format(date.to, "LLL dd, y")}`
              : "Showing data for the last 6 months"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="earnings" fill="var(--color-earnings)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">$ {chartData.reduce((sum, item) => sum + item.earnings, 0).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">+12.5% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">$ {( (chartData.reduce((sum, item) => sum + item.earnings, 0)) / chartData.length / 10).toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">Per sale average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{(Math.random() * 10 + 5).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-1">Clicks to sales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
