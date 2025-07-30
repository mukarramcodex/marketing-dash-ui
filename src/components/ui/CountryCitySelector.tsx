"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const countries = [
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
];

const citiesByCountry: { [key: string]: { value: string, label: string }[] } = {
  usa: [
    { value: "nyc", label: "New York" },
    { value: "la", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
  ],
  canada: [
    { value: "toronto", label: "Toronto" },
    { value: "vancouver", label: "Vancouver" },
    { value: "montreal", label: "Montreal" },
  ],
  uk: [
    { value: "london", label: "London" },
    { value: "manchester", label: "Manchester" },
    { value: "birmingham", label: "Birmingham" },
  ],
  australia: [
    { value: "sydney", label: "Sydney" },
    { value: "melbourne", label: "Melbourne" },
    { value: "brisbane", label: "Brisbane" },
  ],
  germany: [
    { value: "berlin", label: "Berlin" },
    { value: "hamburg", label: "Hamburg" },
    { value: "munich", label: "Munich" },
  ],
};

interface CountryCitySelectorProps {
  country: string;
  onCountryChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
}

export function CountryCitySelector({ country, onCountryChange, city, onCityChange }: CountryCitySelectorProps) {
  const [availableCities, setAvailableCities] = React.useState<{ value: string, label: string }[]>([]);

  React.useEffect(() => {
    if (country && citiesByCountry[country]) {
      setAvailableCities(citiesByCountry[country]);
    } else {
      setAvailableCities([]);
    }
    onCityChange(""); // Reset city when country changes
  }, [country, onCityChange]);

  return (
    <>
      <Select value={country} onValueChange={onCountryChange}>
        <SelectTrigger id="country">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={city} onValueChange={onCityChange} disabled={!country || availableCities.length === 0}>
        <SelectTrigger id="city">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {availableCities.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
