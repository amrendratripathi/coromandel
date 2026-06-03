import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/80 px-4 py-2 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
