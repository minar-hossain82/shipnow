export function Logo() {
  return (
    <div
      className="relative mx-auto mb-8 h-6 w-7"
      role="img"
      aria-label="ShipNow"
    >
      <div className="absolute top-0 left-1 h-3.5 w-2 -skew-x-[18deg] bg-purple-600" />
      <div className="absolute right-1 bottom-0 h-3.5 w-2 -skew-x-[18deg] bg-purple-600" />
    </div>
  );
}
