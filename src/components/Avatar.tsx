import { BookOpen, Feather, Crown, Star, Snowflake, Bird, Landmark, Rocket, type LucideIcon } from "lucide-react";

export const AVATARS: Record<string, LucideIcon> = {
  book: BookOpen, feather: Feather, crown: Crown, star: Star,
  snow: Snowflake, bird: Bird, kremlin: Landmark, rocket: Rocket,
};

export function Avatar({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = AVATARS[name] ?? BookOpen;
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground ${className}`} style={{ width: size * 2, height: size * 2 }}>
      <Icon size={size} />
    </span>
  );
}
