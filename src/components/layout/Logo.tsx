import Link from 'next/link';
import { Rocket } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

export function Logo({ className, iconSize = 24, textSize = "text-xl" }: LogoProps) {
  return (
    <Link href="/dashboard" className={`flex items-center gap-2 ${className}`}>
      <Rocket size={iconSize} className="text-primary" />
      <span className={`font-headline font-bold ${textSize} text-foreground`}>
        ProMillion Marketing
      </span>
    </Link>
  );
}
