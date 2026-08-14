import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-ink",
        className,
      )}
    >
      <span className="relative flex size-8 items-center justify-center rounded-full bg-ink">
        <svg
          viewBox="0 0 32 32"
          className="size-5"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 20c3-2 4.5-4 6-6 1.5 2 3 4 6 6s4.5-2 6-4"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="6" cy="20" r="1.6" fill="white" />
        </svg>
      </span>
      <span className="font-display text-2xl uppercase leading-none tracking-wide">
        Ventura
      </span>
    </span>
  );
}