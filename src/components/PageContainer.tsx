import { PWAHandler } from "@/pwa";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PWAHandler />
      <div className="container mx-auto p-10">{children}</div>
    </>
  );
}
