export function CardGrid({
  children,
  minItemWidth = 300,
}: {
  children: React.ReactNode;
  minItemWidth?: number;
}) {
  return (
    <div
      className="grid items-top justify-center gap-12"
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
