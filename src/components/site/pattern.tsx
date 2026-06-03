export function TemplePattern() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      <div className="pattern-lattice absolute -left-10 top-8 h-48 w-48 rounded-full" />
      <div className="pattern-lattice absolute bottom-0 right-0 h-64 w-64 rotate-12 rounded-full" />
    </div>
  );
}
