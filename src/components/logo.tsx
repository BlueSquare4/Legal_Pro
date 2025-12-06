import { cn } from "@/lib/utils";
import { Scale } from "lucide-react";

export function Logo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-headline text-xl font-bold",
        className
      )}
      {...props}
    >
      <Scale className="h-6 w-6 text-accent" />
      <span>LexiDoc AI</span>
    </div>
  );
}
