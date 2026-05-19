export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`inline-flex items-center ${className}`} aria-label="Hooksy.click">
      <img
        src="/logo.svg"
        alt="Hooksy.click"
        className="h-10 w-auto max-w-[220px] object-contain object-left sm:h-11 sm:max-w-[240px]"
        width={240}
        height={48}
      />
    </a>
  );
}
