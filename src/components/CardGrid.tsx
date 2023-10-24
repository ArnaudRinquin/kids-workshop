export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid items-center justify-center gap-12"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {children}
    </div>
  );
}
